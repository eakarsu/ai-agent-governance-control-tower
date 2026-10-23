'use client';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';

export default function LoginPage() {
const authRequestLock = useRef(false), credentialRequestLock = useRef(false);
const [loginPending, setLoginPending] = useState(false);

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

if (authRequestLock.current) return;
authRequestLock.current = true; setLoginPending(true);
try {

    setSubmitting(true);
    const ok = await login(nextEmail, nextPassword);
    setSubmitting(false);
    if (!ok) {
      setError('Invalid email or password.');
      return;
    }
    router.push('/dashboard');

} catch (failure) { setError('Unable to sign in. Check your credentials or connection and try again.'); } finally { setSubmitting(false); authRequestLock.current = false; setLoginPending(false); }
};

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await signInWithCredentials(email, password);
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
          <button className="button primary" type="submit" disabled={submitting}>
            {submitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {error ? <div style={{ color: '#b91c1c', marginTop: 14 }}>{error}</div> : null}
      </div>
    </div>
  );
}
