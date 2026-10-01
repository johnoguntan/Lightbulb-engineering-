'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthShell, Field, SubmitButton, GoogleButton, Alert, Link, isEmail, friendlyAuthError } from './ui';
import { useAuth } from '@/context/AuthContext';

function passwordIssues(pw) {
  const issues = [];
  if (pw.length < 8) issues.push('8+ characters');
  if (!/[0-9]/.test(pw)) issues.push('a number');
  if (!/[a-zA-Z]/.test(pw)) issues.push('a letter');
  return issues;
}

export default function SignUpView() {
  const { signUp, configured } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params?.get('next') || '/account';

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', business: false, company: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [sentTo, setSentTo] = useState('');
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const issues = passwordIssues(form.password);

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = {};
    if (form.name.trim().length < 2) found.name = 'Enter your full name.';
    if (!isEmail(form.email)) found.email = 'Enter a valid email address.';
    if (form.phone && form.phone.replace(/\D/g, '').length < 10) found.phone = 'Enter a valid phone number, or leave it blank.';
    if (issues.length) found.password = `Password needs ${issues.join(', ')}.`;
    if (form.business && form.company.trim().length < 2) found.company = 'Enter your company name.';
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }

    setBusy(true);
    setMessage('');
    const { data, error } = await signUp(form.email.trim(), form.password, {
      full_name: form.name.trim(),
      phone: form.phone.trim(),
      account_type: form.business ? 'business' : 'personal',
      company: form.business ? form.company.trim() : '',
    });
    setBusy(false);
    if (error) return setMessage(friendlyAuthError(error.message));
    // If email confirmation is on, there's no session yet.
    if (data?.session) router.push(next.startsWith('/') ? next : '/account');
    else setSentTo(form.email.trim());
  };

  if (sentTo) {
    return (
      <AuthShell
        image="/images/lightbulb/backpack-olive-lifestyle-woman.jpg"
        imageAlt="Woman opening the front pocket of an olive Lightbulb backpack"
        eyebrow="Almost there"
        title="Check your email"
        subtitle={`We’ve sent a confirmation link to ${sentTo}. Tap it to activate your account, then sign in.`}
        footer={<Link href="/account/sign-in" className="text-primary font-semibold hover:underline">Back to sign in</Link>}
      />
    );
  }

  return (
    <AuthShell
      image="/images/lightbulb/backpack-olive-lifestyle-woman.jpg"
      imageAlt="Woman opening the front pocket of an olive Lightbulb backpack"
      position="50% 30%"
      quote="Made in Lagos, for the way you move."
      eyebrow="Join Lightbulb"
      title="Create your account"
      subtitle="Save addresses, track every order and manage packaging quotes in one place."
      footer={
        <>
          Already have an account?{' '}
          <Link href="/account/sign-in" className="text-primary font-semibold hover:underline">Sign in</Link>
        </>
      }
    >
      <GoogleButton label="Sign up with Google" />
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <Alert>{message}</Alert>
        <Field id="name" label="Full name" autoComplete="name" value={form.name} onChange={set('name')} error={errors.name} />
        <Field id="email" label="Email" type="email" autoComplete="email" value={form.email} onChange={set('email')} error={errors.email} />
        <Field id="phone" label="Phone (optional)" type="tel" autoComplete="tel" placeholder="+234" value={form.phone} onChange={set('phone')} error={errors.phone} hint="For delivery updates from the rider." />
        <Field
          id="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          value={form.password}
          onChange={set('password')}
          error={errors.password}
          hint={form.password ? (issues.length ? `Still needs ${issues.join(', ')}.` : 'Strong enough ✓') : 'At least 8 characters, with a letter and a number.'}
        />

        <label className="flex items-start gap-3 p-4 rounded-2xl border border-outline-variant bg-surface-container-lowest cursor-pointer">
          <input type="checkbox" checked={form.business} onChange={set('business')} className="mt-0.5 w-4 h-4 accent-primary" />
          <span className="text-sm">
            <span className="font-semibold text-on-surface block">I’m buying for a business</span>
            <span className="text-xs text-on-surface-variant">Unlocks packaging quotes and reorders in your dashboard.</span>
          </span>
        </label>
        {form.business && <Field id="company" label="Company name" autoComplete="organization" value={form.company} onChange={set('company')} error={errors.company} />}

        <SubmitButton busy={busy} disabled={!configured}>Create account</SubmitButton>
        <p className="text-[11px] text-on-surface-variant text-center">
          By creating an account you agree to our terms and privacy policy.
        </p>
      </form>
    </AuthShell>
  );
}
