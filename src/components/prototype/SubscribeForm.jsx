'use client';

import { useState } from 'react';

// Set NEXT_PUBLIC_SUBSCRIBE_ENDPOINT to any endpoint that accepts a JSON POST
// ({ email, source }) — e.g. Formspree, a Supabase edge function, Mailchimp proxy.
const ENDPOINT = process.env.NEXT_PUBLIC_SUBSCRIBE_ENDPOINT || '';

export default function SubscribeForm({ placeholder = 'Your email address', cta = 'Join', source = 'site', tone = 'light' }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle'); // idle | sending | done | error | offline

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setState('error');
      return;
    }
    if (!ENDPOINT) {
      setState('offline');
      return;
    }
    setState('sending');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email: email.trim(), source }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState('done');
      setEmail('');
    } catch {
      setState('error');
    }
  };

  const messages = {
    done: 'You’re on the list — thank you.',
    error: 'Please enter a valid email address and try again.',
    offline: 'Sign-ups open soon. Please check back shortly.',
  };

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div className="flex gap-2">
        <label className="sr-only" htmlFor={`subscribe-${source}`}>
          Email address
        </label>
        <input
          id={`subscribe-${source}`}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state !== 'idle' && state !== 'sending') setState('idle');
          }}
          placeholder={placeholder}
          className={`min-w-0 flex-1 px-5 py-3 rounded-full text-sm border focus:outline-none focus:ring-2 focus:ring-primary ${
            tone === 'light' ? 'bg-surface-container-lowest border-outline-variant/60' : 'bg-surface-container-lowest border-transparent'
          }`}
        />
        <button
          type="submit"
          disabled={state === 'sending'}
          className="shrink-0 px-5 py-3 rounded-full bg-primary text-on-primary font-display text-sm font-bold hover:bg-primary-container transition-colors disabled:opacity-60"
        >
          {state === 'sending' ? '…' : cta}
        </button>
      </div>
      <p aria-live="polite" className={`mt-2 text-xs min-h-[1rem] ${state === 'error' ? 'text-error' : 'text-on-surface-variant'}`}>
        {messages[state] || ''}
      </p>
    </form>
  );
}
