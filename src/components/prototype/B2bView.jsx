'use client';

import { useState } from 'react';
import Link from 'next/link';
import Photo from './Photo';
import { useAuth } from '@/context/AuthContext';
import { getSupabase } from '@/lib/supabase';

const SHOWCASE = [
  { src: '/images/lightbulb/pack-garment-red.jpg', alt: 'Red branded garment bag' },
  { src: '/images/lightbulb/pack-garment-white.jpg', alt: 'White and black branded garment bag' },
  { src: '/images/lightbulb/pack-garment-pink.jpg', alt: 'Pink branded garment bag' },
  { src: '/images/lightbulb/pack-garment-brown.jpg', alt: 'Brown and beige branded garment bag' },
  { src: '/images/lightbulb/pack-drawstring-black.jpg', alt: 'Black and red branded drawstring bag' },
  { src: '/images/lightbulb/pack-drawstring-cream.jpg', alt: 'Cream drawstring bag with orange print' },
  { src: '/images/lightbulb/pack-drawstring-pink.jpg', alt: 'Pink branded drawstring bag' },
  { src: '/images/lightbulb/pack-drawstring-white.jpg', alt: 'White branded drawstring bag' },
  { src: '/images/lightbulb/pack-garment-cream.jpg', alt: 'Cream and black branded garment bag' },
];

export default function B2bView() {
  const [tier, setTier] = useState(250);
  const [fluting, setFluting] = useState('E-Flute');
  const [rfqSubmitted, setRfqSubmitted] = useState(false);
  const [rfqState, setRfqState] = useState(''); // '' | sending | sent | error
  const { user, configured } = useAuth();

  const submitRfq = async () => {
    const sb = getSupabase();
    if (!sb || !user) {
      setRfqSubmitted(true);
      return;
    }
    const dims = ['len', 'wid', 'dep'].map((id) => document.getElementById(`rfq-${id}`)?.value || '');
    setRfqState('sending');
    const { error } = await sb.from('quote_requests').insert({
      company: user.user_metadata?.company || null,
      product: `Custom packaging (${fluting})`,
      quantity: tier,
      details: { length_mm: dims[0], width_mm: dims[1], depth_mm: dims[2], fluting },
    });
    setRfqState(error ? 'error' : 'sent');
  };

  const unitPrices = { 250: 845, 1000: 690, 5000: 550 };
  const unitPrice = unitPrices[tier] || 845;
  const totalCost = unitPrice * tier;

  return (
    <section className="route-view flex-col w-full flex" id="view-b2b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-primary">Enterprise Wholesale Architecture</span>
            <h1 className="font-display font-bold text-4xl text-on-surface mt-1">Industrial Packaging Quoting Engine</h1>
            <p className="font-body-md text-sm text-on-surface-variant mt-2">
              Configure custom corrugated mailers, fluting profiles, and volume tiered discounts with instant production estimations.
            </p>
          </div>
          <Link
            href="/catalog"
            className="px-5 py-2.5 rounded-full bg-surface-container text-on-surface font-display text-xs font-bold flex items-center gap-2 hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">storefront</span>
            <span>Browse Retail Store Catalog</span>
          </Link>
        </div>

        {/* Real work: branded packaging made by Lightbulb Packaging */}
        <div className="mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary mb-3">Made for our clients</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SHOWCASE.map((p, i) => (
              <div key={p.src} className={`relative rounded-3xl overflow-hidden bg-surface-container-high ${i === 0 ? 'col-span-2 row-span-2 aspect-square sm:aspect-auto' : 'aspect-square'}`}>
                <Photo src={p.src} alt={p.alt} sizes={i === 0 ? '(min-width:640px) 50vw, 100vw' : '(min-width:640px) 25vw, 50vw'} />
              </div>
            ))}
          </div>
        </div>

        <div id="quote" className="grid grid-cols-1 lg:grid-cols-12 gap-8 scroll-mt-32">
          {/* Quoter Form Inputs */}
          <div className="lg:col-span-7 bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/60 shadow-sm space-y-6">
            <h3 className="font-display font-bold text-xl text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">square_foot</span>
              1. Box Geometry &amp; Dimensions (mm)
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="rfq-len" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Length (mm)</label>
                <input id="rfq-len" className="w-full p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant text-on-surface font-bold text-sm focus:ring-2 focus:ring-primary focus:outline-none" defaultValue="350" type="number" />
              </div>
              <div>
                <label htmlFor="rfq-wid" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Width (mm)</label>
                <input id="rfq-wid" className="w-full p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant text-on-surface font-bold text-sm focus:ring-2 focus:ring-primary focus:outline-none" defaultValue="250" type="number" />
              </div>
              <div>
                <label htmlFor="rfq-dep" className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Depth (mm)</label>
                <input id="rfq-dep" className="w-full p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant text-on-surface font-bold text-sm focus:ring-2 focus:ring-primary focus:outline-none" defaultValue="80" type="number" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3">2. Select Fluting Profile Grade</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label 
                  onClick={() => setFluting('E-Flute')}
                  className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                    fluting === 'E-Flute'
                      ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                      : 'border-outline-variant bg-surface-container-low hover:bg-surface-container'
                  }`}
                >
                  <input type="radio" name="flute" checked={fluting === 'E-Flute'} onChange={() => setFluting('E-Flute')} className="mt-1 text-primary" />
                  <div>
                    <span className="block font-display font-bold text-sm text-on-surface">E-Flute Micro (1.5mm)</span>
                    <span className="text-xs text-on-surface-variant">Superior print fidelity for direct consumer unboxing.</span>
                  </div>
                </label>

                <label 
                  onClick={() => setFluting('B-Flute')}
                  className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                    fluting === 'B-Flute'
                      ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                      : 'border-outline-variant bg-surface-container-low hover:bg-surface-container'
                  }`}
                >
                  <input type="radio" name="flute" checked={fluting === 'B-Flute'} onChange={() => setFluting('B-Flute')} className="mt-1 text-primary" />
                  <div>
                    <span className="block font-display font-bold text-sm text-on-surface">B-Flute Heavy (3.0mm)</span>
                    <span className="text-xs text-on-surface-variant">Enhanced crush resistance for freight logistics.</span>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3">3. Production Volume Tier</label>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setTier(250)}
                  className={`p-3.5 rounded-2xl font-bold transition-all border ${
                    tier === 250
                      ? 'bg-primary text-on-primary border-primary shadow-sm'
                      : 'bg-surface-container-low text-on-surface border-outline-variant hover:bg-surface-container'
                  }`}
                >
                  250 Units (MOQ)
                </button>
                <button
                  type="button"
                  onClick={() => setTier(1000)}
                  className={`p-3.5 rounded-2xl font-bold transition-all border ${
                    tier === 1000
                      ? 'bg-primary text-on-primary border-primary shadow-sm'
                      : 'bg-surface-container-low text-on-surface border-outline-variant hover:bg-surface-container'
                  }`}
                >
                  1,000 Units (-18%)
                </button>
                <button
                  type="button"
                  onClick={() => setTier(5000)}
                  className={`p-3.5 rounded-2xl font-bold transition-all border ${
                    tier === 5000
                      ? 'bg-primary text-on-primary border-primary shadow-sm'
                      : 'bg-surface-container-low text-on-surface border-outline-variant hover:bg-surface-container'
                  }`}
                >
                  5,000+ Units (-34%)
                </button>
              </div>
            </div>
          </div>

          {/* Quoter Summary Output */}
          <div className="lg:col-span-5 bg-surface-container-low p-8 rounded-3xl border border-outline-variant/60 shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-sans text-xs font-bold uppercase tracking-wider text-primary">Estimated Cost Model</span>
                <span className="text-[11px] bg-surface-container-lowest border border-outline-variant px-3 py-1 rounded-full font-bold">
                  Lagos Plant Direct
                </span>
              </div>

              <h2 className="font-display font-bold text-4xl text-on-surface mb-1">
                ₦{unitPrice} <span className="font-display text-sm text-on-surface-variant font-normal">/ unit</span>
              </h2>
              <p className="text-xs text-on-surface-variant mb-6">
                Total Estimated Run: <strong className="text-on-surface font-bold">₦{totalCost.toLocaleString()} NGN ({tier} units)</strong>
              </p>

              <div className="space-y-3 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/60 text-xs">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Selected Grade:</span>
                  <span className="font-bold text-on-surface">{fluting}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Die-Plate Tooling:</span>
                  <span className="font-bold text-on-surface">{tier >= 1000 ? 'Waived (Free)' : '₦35,000'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Double-side Soy Print:</span>
                  <span className="font-bold text-on-surface">Included</span>
                </div>
                <div className="flex justify-between border-t border-outline-variant/40 pt-3">
                  <span className="text-on-surface-variant">Turnaround Time:</span>
                  <span className="font-bold text-primary">5 Working Days (Lagos Direct)</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {rfqState === 'sent' ? (
                <div className="p-4 rounded-2xl bg-primary-container text-on-primary-container text-xs font-bold text-center">
                  Quote request sent. Track it under{' '}
                  <Link href="/account?tab=business" className="underline">Business &amp; quotes</Link> in your account.
                </div>
              ) : rfqSubmitted ? (
                <div className="p-4 rounded-2xl bg-primary-container text-on-primary-container text-xs font-bold text-center">
                  {configured ? (
                    <>
                      <Link href="/account/sign-in?next=/b2b%23quote" className="underline">Sign in</Link> or{' '}
                      <Link href="/account/sign-up?next=/b2b%23quote" className="underline">create a business account</Link> to send this request and track it.
                    </>
                  ) : (
                    'Online quote requests are opening soon. In the meantime, visit or call the Ifako-Gbagada studio with these details.'
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={submitRfq}
                  disabled={rfqState === 'sending'}
                  className="w-full py-4 rounded-full bg-primary text-on-primary font-display font-bold text-sm shadow-md hover:bg-primary-container transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <span className="material-symbols-outlined text-[20px]">request_quote</span>
                  <span>{rfqState === 'sending' ? 'SENDING…' : 'REQUEST A QUOTE'}</span>
                </button>
              )}
              {rfqState === 'error' && <p role="alert" className="text-xs text-error font-semibold text-center">We couldn’t send that request. Please try again.</p>}

              <Link
                href="/checkout"
                className="w-full py-3.5 rounded-full bg-surface-container-lowest text-on-surface font-display text-xs font-bold hover:bg-surface transition-colors border border-outline-variant text-center block"
              >
                Proceed to Checkout Sample Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
