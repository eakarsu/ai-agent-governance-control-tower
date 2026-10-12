'use client';
import { useRef as useNativeDemoLoginRef, useState as useNativeDemoLoginState } from 'react';


import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';

export default function LoginPage() {
const nativeDemoAuthRequestLock = useNativeDemoLoginRef(false), demoCredentialRequestLock = useNativeDemoLoginRef(false);
const [nativeDemoLoginPending, setNativeDemoLoginPending] = useNativeDemoLoginState(false);

  const router = useRouter();
  const { ready, user, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (ready && user) {
      router.replace('/dashboard');
    }
  }, [ready, router, user]);

  const [submitting, setSubmitting] = useState(false);

  const signInWithCredentials = async (nextEmail: string, nextPassword: string) => {

if (nativeDemoAuthRequestLock.current) return;
nativeDemoAuthRequestLock.current = true; setNativeDemoLoginPending(true);
try {

    setSubmitting(true);
    const ok = await login(nextEmail, nextPassword);
    setSubmitting(false);
    if (!ok) {
      setError('Invalid email or password.');
      return;
    }
    router.push('/dashboard');

} catch (nativeDemoFailure) { setError('Unable to sign in. Check your credentials or connection and try again.'); } finally { setSubmitting(false); nativeDemoAuthRequestLock.current = false; setNativeDemoLoginPending(false); }
};

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await signInWithCredentials(email, password);
  };

  const onAutoFill = async () => {
    const demoEmail = process.env.NEXT_PUBLIC_DEMO_EMAIL;
    const demoPassword = process.env.NEXT_PUBLIC_DEMO_PASSWORD;
    if (!demoEmail || !demoPassword) {
      setError('Demo credentials are not configured.');
      return;
    }
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
    await signInWithCredentials(demoEmail, demoPassword);
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="pill">Agent Ops</div>
        <h1 style={{ marginBottom: 8 }}>AI Agent Ops login</h1>
        <div className="muted">
          One login for ai agent ops features, source tables, documents, notifications, audit, approvals, and AI operations.
        </div>

        <form onSubmit={onSubmit}>
          <label>
            Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button
            type="button"
            onClick={async () => { if (demoCredentialRequestLock.current || nativeDemoAuthRequestLock.current) return; demoCredentialRequestLock.current = true; setNativeDemoLoginPending(true); try { await (onAutoFill)();   } finally { demoCredentialRequestLock.current = false; setNativeDemoLoginPending(false); } }}
            disabled={nativeDemoLoginPending || Boolean(submitting)}
            aria-label="Log In as Demo"
            style={{ width: '100%', marginBottom: '12px', padding: '10px 14px', borderRadius: '8px', border: '1px solid currentColor', background: 'transparent', cursor: 'pointer' }}
          >
            Log In as Demo
          </button>
          <button className="button primary" type="submit" disabled={submitting}>
            {submitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {error ? <div style={{ color: '#b91c1c', marginTop: 14 }}>{error}</div> : null}
      </div>
    </div>
  );
}
