'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthShell, Field, SubmitButton, Alert, Link, friendlyAuthError } from './ui';
import { useAuth } from '@/context/AuthContext';

// Supabase signs the user in from the emailed link, then this page sets the new password.
export default function ResetPasswordView() {
  const { updatePassword, user, loading, configured } = useAuth();
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8 || !/[0-9]/.test(password) || !/[a-zA-Z]/.test(password)) {
      return setError('Use at least 8 characters, with a letter and a number.');
    }
    if (password !== confirm) return setError('The two passwords don’t match.');
    setBusy(true);
    const { error: err } = await updatePassword(password);
    setBusy(false);
    if (err) return setError(friendlyAuthError(err.message));
    router.push('/account?updated=password');
  };

  const linkExpired = configured && !loading && !user;

  return (
    <AuthShell
      image="/images/lightbulb/heather-backpack-brown-bike.jpg"
      imageAlt="Man with a brown Lightbulb backpack beside a bicycle"
      position="35% 50%"
      eyebrow="Password help"
      title="Choose a new password"
      footer={<Link href="/account/sign-in" className="text-primary font-semibold hover:underline">Back to sign in</Link>}
    >
      {linkExpired ? (
        <Alert>
          This reset link has expired or was already used.{' '}
          <Link href="/account/forgot-password" className="underline font-semibold">Send a new one</Link>.
        </Alert>
      ) : (
        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <Alert>{error}</Alert>
          <Field id="password" label="New password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Field id="confirm" label="Confirm new password" type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          <SubmitButton busy={busy} disabled={!configured}>Update password</SubmitButton>
        </form>
      )}
    </AuthShell>
  );
}
