'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Photo from '../prototype/Photo';
import { useAuth } from '@/context/AuthContext';
import { OrdersPanel, AddressesPanel, ProfilePanel, BusinessPanel, OverviewPanel } from './panels';

const TABS = [
  { id: 'overview', label: 'Overview', icon: 'space_dashboard' },
  { id: 'orders', label: 'Orders', icon: 'receipt_long' },
  { id: 'addresses', label: 'Addresses', icon: 'home_pin' },
  { id: 'business', label: 'Business & quotes', icon: 'package_2' },
  { id: 'profile', label: 'Profile & password', icon: 'person' },
];

export default function AccountView() {
  const { user, loading, configured, signOut } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const initial = TABS.some((t) => t.id === params?.get('tab')) ? params.get('tab') : 'overview';
  const [tab, setTabState] = useState(initial);
  const leaving = useRef(false);

  const setTab = (id) => {
    setTabState(id);
    const url = new URL(window.location.href);
    if (id === 'overview') url.searchParams.delete('tab');
    else url.searchParams.set('tab', id);
    window.history.replaceState(null, '', url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Send signed-out visitors to sign in (only once accounts are switched on).
  useEffect(() => {
    if (configured && !loading && !user && !leaving.current) router.replace('/account/sign-in?next=/account');
  }, [configured, loading, user, router]);

  if (configured && (loading || !user)) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center text-sm text-on-surface-variant" role="status">
        Loading your account…
      </div>
    );
  }

  const meta = user?.user_metadata || {};
  const firstName = (meta.full_name || '').split(' ')[0] || (user ? 'there' : 'there');
  const preview = !configured;

  const onSignOut = async () => {
    leaving.current = true;
    router.push('/');
    await signOut();
  };

  return (
    <>
      {/* Greeting band */}
      <section className="relative w-full h-48 sm:h-56 overflow-hidden bg-inverse-surface">
        <Photo src="/images/lightbulb/lifestyle-overhead-steps.jpg" alt="" priority sizes="100vw" position="50% 40%" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-8 text-white">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-fixed-dim">Your account</p>
          <h1 className="font-display font-medium text-3xl sm:text-4xl mt-1">Hello, {firstName}.</h1>
          {user?.email && <p className="text-sm text-white/80 mt-1">{user.email}</p>}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full">
        {preview && (
          <p role="status" className="mb-8 p-4 rounded-2xl bg-tertiary-fixed/50 text-on-tertiary-fixed text-sm font-medium flex gap-2">
            <span className="material-symbols-outlined text-[20px]">visibility</span>
            <span>
              <strong>Preview.</strong> Accounts aren&apos;t switched on yet, so this is what a customer sees before they&apos;ve ordered anything. Add the Supabase keys to make it live.
            </span>
          </p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Tabs: horizontal scroll on mobile, sidebar on desktop */}
          <nav aria-label="Account sections" className="lg:col-span-3">
            <ul className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0 lg:sticky lg:top-32">
              {TABS.map((t) => (
                <li key={t.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setTab(t.id)}
                    aria-current={tab === t.id ? 'page' : undefined}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-colors whitespace-nowrap ${
                      tab === t.id ? 'bg-on-surface text-surface' : 'bg-surface-container-lowest lg:bg-transparent text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">{t.icon}</span>
                    {t.label}
                  </button>
                </li>
              ))}
              {user && (
                <li className="shrink-0 lg:mt-4 lg:pt-4 lg:border-t lg:border-outline-variant/50">
                  <button
                    type="button"
                    onClick={onSignOut}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-on-surface-variant hover:bg-error-container hover:text-on-error-container transition-colors whitespace-nowrap"
                  >
                    <span className="material-symbols-outlined text-[20px]">logout</span>
                    Sign out
                  </button>
                </li>
              )}
            </ul>
          </nav>

          <div className="lg:col-span-9 min-w-0">
            {tab === 'overview' && <OverviewPanel goTo={setTab} />}
            {tab === 'orders' && <OrdersPanel />}
            {tab === 'addresses' && <AddressesPanel />}
            {tab === 'business' && <BusinessPanel />}
            {tab === 'profile' && <ProfilePanel />}
          </div>
        </div>

        <div className="mt-12 rounded-3xl bg-surface-container-low border border-outline-variant/50 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-display font-bold text-on-surface">Need a hand with an order?</p>
            <p className="text-sm text-on-surface-variant">Visit the Ifako-Gbagada studio, Mon–Fri 8am–6pm WAT.</p>
          </div>
          <Link href="/craft" className="px-5 py-3 rounded-full bg-surface-container-lowest border border-outline-variant text-sm font-bold text-on-surface hover:bg-surface-container-high transition-colors text-center">
            Studio details
          </Link>
        </div>
      </div>
    </>
  );
}
