'use client';

import { useState } from 'react';
import { AuthShell, Field, SubmitButton, Alert, Link, isEmail, friendlyAuthError } from './ui';
import { useAuth } from '@/context/AuthContext';

export default function ForgotPasswordView() {
  const { sendPasswordReset, configured } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isEmail(email)) return setError('Enter a valid email address.');
    setBusy(true);
    setError('');
    const { error: err } = await sendPasswordReset(email.trim());
    setBusy(false);
    if (err) return setError(friendlyAuthError(err.message));
    setSent(true);
  };

  return (
    <AuthShell
      image="/images/lightbulb/heather-backpack-brown-bike.jpg"
      imageAlt="Man with a brown Lightbulb backpack beside a bicycle"
      position="35% 50%"
      eyebrow="Password help"
      title={sent ? 'Check your inbox' : 'Reset your password'}
      subtitle={
        sent
          ? `If an account exists for ${email.trim()}, you’ll get a link to choose a new password in the next few minutes.`
          : 'Enter the email you signed up with and we’ll send you a reset link.'
      }
      footer={<Link href="/account/sign-in" className="text-primary font-semibold hover:underline">Back to sign in</Link>}
    >
      {!sent && (
        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <Field id="email" label="Email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={error} />
          <SubmitButton busy={busy} disabled={!configured}>Send reset link</SubmitButton>
        </form>
      )}
      {sent && <Alert tone="info">Didn’t get it? Check spam, or wait a minute and try again.</Alert>}
    </AuthShell>
  );
}
