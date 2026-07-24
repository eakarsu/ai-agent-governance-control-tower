import { NextRequest, NextResponse } from 'next/server';
import { aiTools, getAITool } from '@/lib/aiTools';
import { appendAuditEntry } from '@/lib/auditStore';
import { requireSession } from '@/lib/requestAuth';
import { ensurePostgres } from '@/lib/postgres';
import crypto from 'node:crypto';

async function callConfiguredAI(system: string, prompt: string) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const baseUrl = process.env.OPENROUTER_BASE_URL;
  const model = process.env.OPENROUTER_MODEL;
  if (!apiKey || !model || baseUrl !== 'https://openrouter.ai/api/v1') {
    throw new Error('OpenRouter configuration is incomplete');
  }

  const response = await fetch(baseUrl + '/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: prompt },
      ],
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    throw new Error('AI provider returned ' + response.status);
  }

  const payload = await response.json();
  const content = payload?.choices?.[0]?.message?.content;
  if (typeof content !== 'string' || !content.trim()) {
    throw new Error('OpenRouter returned no substantive content');
  }
  return {
    content: content.trim(),
    model: String(payload.model || model),
    providerReceipt: {
      id: String(payload.id || ''),
      provider: 'openrouter',
      created: payload.created ?? null,
    },
    usage: payload.usage ?? null,
  };
}

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
    const aiResponse = await callConfiguredAI(system, input);
    const id = crypto.randomUUID();
    const pool = await ensurePostgres();
    await pool.query(
      `INSERT INTO governance_ai_results
        (id,user_email,tool_id,prompt,model,provider_receipt,result,usage)
       VALUES($1,$2,$3,$4,$5,$6::jsonb,$7,$8::jsonb)`,
      [id, session.email, tool.id, input, aiResponse.model,
        JSON.stringify(aiResponse.providerReceipt), aiResponse.content,
        aiResponse.usage ? JSON.stringify(aiResponse.usage) : null],
    );

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
  } catch (error) {
    console.error('OpenRouter request failed', error);
    return NextResponse.json({ error: 'OpenRouter request failed' }, { status: 502 });
  }
}
