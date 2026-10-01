'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthShell, Field, SubmitButton, GoogleButton, Alert, Link, isEmail, friendlyAuthError } from './ui';
import { useAuth } from '@/context/AuthContext';

export default function SignInView() {
  const { signIn, configured } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params?.get('next') || '/account';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = {};
    if (!isEmail(email)) found.email = 'Enter a valid email address.';
    if (!password) found.password = 'Enter your password.';
    setErrors(found);
    if (Object.keys(found).length) return;

    setBusy(true);
    setMessage('');
    const { error } = await signIn(email.trim(), password);
    setBusy(false);
    if (error) return setMessage(friendlyAuthError(error.message));
    router.push(next.startsWith('/') ? next : '/account');
  };

  return (
    <AuthShell
      image="/images/lightbulb/weekender-crimson-arch.jpg"
      imageAlt="A man leaning against a stone arch holding a crimson Lightbulb weekender"
      position="50% 50%"
      quote="Welcome back. Your orders, addresses and quotes are right where you left them."
      eyebrow="Your account"
      title="Sign in"
      subtitle="Track orders, reorder packaging and check out faster."
      footer={
        <>
          New to Lightbulb?{' '}
          <Link href={`/account/sign-up${next !== '/account' ? `?next=${encodeURIComponent(next)}` : ''}`} className="text-primary font-semibold hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <GoogleButton />
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <Alert>{message}</Alert>
        <Field id="email" label="Email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
        <Field id="password" label="Password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
        <div className="flex justify-end -mt-1">
          <Link href="/account/forgot-password" className="text-xs font-semibold text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <SubmitButton busy={busy} disabled={!configured}>Sign in</SubmitButton>
      </form>
      <p className="mt-6 text-xs text-on-surface-variant text-center">
        Just want to shop? You can{' '}
        <Link href="/catalog" className="text-primary font-semibold hover:underline">check out as a guest</Link>.
      </p>
    </AuthShell>
  );
}
