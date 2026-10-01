'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Photo from '../prototype/Photo';
import { useAuth } from '@/context/AuthContext';

/** Split-screen layout: lifestyle photo on the left (desktop), form on the right. */
export function AuthShell({ image, imageAlt, position = 'center', quote, eyebrow, title, subtitle, children, footer }) {
  const { configured } = useAuth();
  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-7rem)]">
      <div className="relative hidden lg:block bg-inverse-surface">
        <Photo src={image} alt={imageAlt} priority sizes="50vw" position={position} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden="true" />
        {quote && (
          <p className="absolute bottom-10 left-10 right-10 font-display text-3xl xl:text-4xl text-white leading-tight max-w-md">{quote}</p>
        )}
      </div>

      <div className="flex items-center justify-center px-4 sm:px-8 py-12 lg:py-16">
        <div className="w-full max-w-md">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
          <h1 className="font-display font-medium text-3xl sm:text-4xl text-on-surface mt-2">{title}</h1>
          {subtitle && <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">{subtitle}</p>}

          {!configured && (
            <p role="status" className="mt-6 p-4 rounded-2xl bg-tertiary-fixed/50 text-on-tertiary-fixed text-xs font-semibold flex gap-2">
              <span className="material-symbols-outlined text-[18px]">info</span>
              Accounts aren&apos;t switched on yet. Add the Supabase keys to enable sign-in (see README).
            </p>
          )}

          <div className="mt-8">{children}</div>
          {footer && <div className="mt-8 text-sm text-on-surface-variant text-center">{footer}</div>}
        </div>
      </div>
    </section>
  );
}

export function Field({ id, label, error, hint, type = 'text', ...props }) {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';
  return (
    <div>
      <label htmlFor={id} className="block text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={isPassword && show ? 'text' : type}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={`w-full px-4 py-3.5 rounded-2xl bg-surface-container-lowest border text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
            error ? 'border-error' : 'border-outline-variant'
          } ${isPassword ? 'pr-12' : ''}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-on-surface-variant hover:text-on-surface"
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            <span className="material-symbols-outlined text-[20px]">{show ? 'visibility_off' : 'visibility'}</span>
          </button>
        )}
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-error font-semibold">{error}</p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-on-surface-variant">{hint}</p>
      ) : null}
    </div>
  );
}

export function SubmitButton({ children, busy, disabled }) {
  return (
    <button
      type="submit"
      disabled={busy || disabled}
      className="w-full py-4 rounded-full bg-primary text-on-primary font-display font-bold text-sm shadow-md hover:bg-primary-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
    >
      {busy ? 'Please wait…' : children}
    </button>
  );
}

// Ask Supabase once whether Google sign-in is enabled, so the button only shows when it works.
let googleEnabledPromise = null;
function isGoogleEnabled() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return Promise.resolve(false);
  if (!googleEnabledPromise) {
    googleEnabledPromise = fetch(`${url}/auth/v1/settings`, { headers: { apikey: key } })
      .then((r) => r.json())
      .then((s) => Boolean(s?.external?.google))
      .catch(() => false);
  }
  return googleEnabledPromise;
}

export function GoogleButton({ label = 'Continue with Google' }) {
  const { signInWithGoogle, configured } = useAuth();
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    let active = true;
    isGoogleEnabled().then((v) => active && setEnabled(v));
    return () => {
      active = false;
    };
  }, []);
  if (!enabled) return null;
  return (
    <>
    <button
      type="button"
      onClick={() => signInWithGoogle()}
      disabled={!configured}
      className="w-full py-3.5 rounded-full border border-outline-variant bg-surface-container-lowest text-on-surface font-semibold text-sm inline-flex items-center justify-center gap-3 hover:bg-surface-container-low transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
        <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
      </svg>
      {label}
    </button>
    <Divider />
    </>
  );
}

export function Divider() {
  return (
    <div className="flex items-center gap-3 my-6 text-[11px] uppercase tracking-widest text-on-surface-variant">
      <span className="flex-1 h-px bg-outline-variant/60" />
      or
      <span className="flex-1 h-px bg-outline-variant/60" />
    </div>
  );
}

export function Alert({ tone = 'error', children }) {
  if (!children) return null;
  return (
    <p
      role={tone === 'error' ? 'alert' : 'status'}
      className={`p-3.5 rounded-2xl text-sm font-medium ${tone === 'error' ? 'bg-error-container text-on-error-container' : 'bg-primary-fixed text-on-primary-fixed-variant'}`}
    >
      {children}
    </p>
  );
}

export { Link };

export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

/** Turn Supabase's messages into friendlier copy. */
export function friendlyAuthError(message = '') {
  const m = message.toLowerCase();
  if (m.includes('invalid login')) return 'That email and password don’t match. Try again or reset your password.';
  if (m.includes('email not confirmed')) return 'Please confirm your email first — check your inbox for the link we sent.';
  if (m.includes('already registered')) return 'An account with this email already exists. Try signing in instead.';
  if (m.includes('rate limit')) return 'Too many attempts. Please wait a minute and try again.';
  return message || 'Something went wrong. Please try again.';
}
