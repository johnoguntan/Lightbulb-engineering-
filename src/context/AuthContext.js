'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getSupabase, supabaseConfigured } from '@/lib/supabase';

const AuthContext = createContext(null);

const NOT_CONFIGURED = { error: { message: 'Accounts aren’t switched on yet. Please check back soon.' } };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(supabaseConfigured);

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) return;
    let active = true;
    sb.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    const { data: sub } = sb.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(() => {
    const sb = getSupabase();
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return {
      configured: supabaseConfigured,
      user,
      session,
      loading,
      signIn: (email, password) => (sb ? sb.auth.signInWithPassword({ email, password }) : Promise.resolve(NOT_CONFIGURED)),
      signUp: (email, password, profile) =>
        sb
          ? sb.auth.signUp({ email, password, options: { data: profile, emailRedirectTo: `${origin}/account` } })
          : Promise.resolve(NOT_CONFIGURED),
      signInWithGoogle: () =>
        sb ? sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${origin}/account` } }) : Promise.resolve(NOT_CONFIGURED),
      sendPasswordReset: (email) =>
        sb ? sb.auth.resetPasswordForEmail(email, { redirectTo: `${origin}/account/reset-password` }) : Promise.resolve(NOT_CONFIGURED),
      updatePassword: (password) => (sb ? sb.auth.updateUser({ password }) : Promise.resolve(NOT_CONFIGURED)),
      updateProfile: (data) => (sb ? sb.auth.updateUser({ data }) : Promise.resolve(NOT_CONFIGURED)),
      signOut: () => (sb ? sb.auth.signOut() : Promise.resolve({})),
    };
  }, [user, session, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
