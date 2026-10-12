import { requestWorkbenchAI, persistWorkbenchResult, workbenchError } from '@/lib/WorkbenchAIRuntime';
import { NextRequest, NextResponse } from 'next/server';
import { aiTools, getAITool } from '@/lib/aiTools';
import { appendAuditEntry } from '@/lib/auditStore';
import { requireSession } from '@/lib/requestAuth';
import { ensurePostgres } from '@/lib/postgres';
import crypto from 'node:crypto';

async function callConfiguredAI(system: string, prompt: string, signal: AbortSignal) { return requestWorkbenchAI(system, prompt, signal); }

export async function GET(request: NextRequest) {
  const session = await requireSession(request);
  if (session instanceof NextResponse) return session;
  return NextResponse.json({ tools: aiTools });
}

export async function POST(request: NextRequest) {
  const session = await requireSession(request);
  if (session instanceof NextResponse) return session;

  const body = await request.json().catch(() => null) as { toolId?: string; input?: string } | null;
  const tool = getAITool(body?.toolId || 'suite-assistant');
  const input = body?.input?.trim() || tool.defaultPrompt;
  const system = 'You are ' + tool.title + '. Stay inside this suite workflow. Return concise operational guidance with risks, next actions, and audit notes.';

  try {
    const aiResponse = await callConfiguredAI(system, input, request.signal);
    const id = crypto.randomUUID();
    const pool = await ensurePostgres();
    await persistWorkbenchResult(request.signal, pool, client => client.query(`INSERT INTO governance_ai_results
        (id,user_email,tool_id,prompt,model,provider_receipt,result,usage)
       VALUES($1,$2,$3,$4,$5,$6::jsonb,$7,$8::jsonb)`, [id, session.email, tool.id, input, aiResponse.model,
        JSON.stringify(aiResponse.providerReceipt), aiResponse.content,
        aiResponse.usage ? JSON.stringify(aiResponse.usage) : null]));

    request.signal.throwIfAborted();

    await appendAuditEntry('AI Tools', ((session.firstName + ' ' + session.lastName).trim() || session.email) + ' ran ' + tool.title);

    return NextResponse.json({
      id,
      tool,
      input,
      response: aiResponse.content,
      provider: 'openrouter',
      model: aiResponse.model,
      usage: aiResponse.usage,
      createdAt: new Date().toISOString(),
    });
  } catch (error) { const failure = workbenchError(error, request.signal); return NextResponse.json({error: failure.error}, {status: failure.status}); }
}
