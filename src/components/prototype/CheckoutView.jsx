'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ImageWithFallback from './ImageWithFallback';
import { useCart, formatNaira } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { getSupabase } from '@/lib/supabase';

const PAYSTACK_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '';
const PAYSTACK_SRC = 'https://js.paystack.co/v1/inline.js';

const EMPTY_FORM = { name: '', email: '', phone: '', address: '', area: '' };

function loadPaystack() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('No window'));
    if (window.PaystackPop) return resolve(window.PaystackPop);
    const existing = document.querySelector(`script[src="${PAYSTACK_SRC}"]`);
    const script = existing || document.createElement('script');
    script.addEventListener('load', () => resolve(window.PaystackPop));
    script.addEventListener('error', () => reject(new Error('Paystack failed to load')));
    if (!existing) {
      script.src = PAYSTACK_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
  });
}

function validate(form, method) {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = 'Enter the recipient’s full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Enter a valid email for your receipt.';
  if (form.phone.replace(/[^\d]/g, '').length < 10) errors.phone = 'Enter a phone number the rider can reach.';
  if (method === 'courier') {
    if (form.address.trim().length < 5) errors.address = 'Enter a street address.';
    if (form.area.trim().length < 2) errors.area = 'Enter your area or district.';
  }
  return errors;
}

function Field({ id, label, error, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
        {label}
      </label>
      <input
        id={id}
        name={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full p-4 rounded-2xl bg-surface-container-low border text-on-surface text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary ${
          error ? 'border-error' : 'border-outline-variant'
        }`}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-error font-semibold">
          {error}
        </p>
      )}
    </div>
  );
}

export default function CheckoutView() {
  const { items, subtotal, courierFee, hydrated, clearCart } = useCart();
  const { user, session, configured } = useAuth();
  const [saveState, setSaveState] = useState(''); // '' | saving | saved | unsaved
  const [method, setMethod] = useState('courier');
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | paying | paid | error
  const [message, setMessage] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  const deliveryFee = method === 'pickup' ? 0 : courierFee;
  const grandTotal = subtotal + deliveryFee;

  useEffect(() => {
    if (PAYSTACK_KEY) loadPaystack().catch(() => {});
  }, []);

  const fillFromAccount = async () => {
    const meta = user?.user_metadata || {};
    let addr = null;
    const sb = getSupabase();
    if (sb) {
      const { data } = await sb.from('addresses').select('*').order('is_default', { ascending: false }).limit(1);
      addr = data?.[0] || null;
    }
    setForm((f) => ({
      name: addr?.name || meta.full_name || f.name,
      email: user?.email || f.email,
      phone: addr?.phone || meta.phone || f.phone,
      address: addr?.address || f.address,
      area: addr?.area || f.area,
    }));
    setErrors({});
  };

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((errs) => ({ ...errs, [key]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(form, method);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    if (!PAYSTACK_KEY) return;

    setStatus('paying');
    setMessage('');
    const reference = `LB-${Date.now().toString(36).toUpperCase()}`;
    const snapshot = { reference, items, subtotal, deliveryFee, grandTotal, method, email: form.email.trim() };

    try {
      const PaystackPop = await loadPaystack();
      const handler = PaystackPop.setup({
        key: PAYSTACK_KEY,
        email: form.email.trim(),
        amount: Math.round(grandTotal * 100), // kobo
        currency: 'NGN',
        ref: reference,
        metadata: {
          custom_fields: [
            { display_name: 'Name', variable_name: 'name', value: form.name.trim() },
            { display_name: 'Phone', variable_name: 'phone', value: form.phone.trim() },
            { display_name: 'Delivery', variable_name: 'delivery', value: method === 'pickup' ? 'Studio pickup' : `${form.address.trim()}, ${form.area.trim()}, Lagos` },
            { display_name: 'Items', variable_name: 'items', value: items.map((i) => `${i.quantity}x ${i.name} (${i.material}${i.monogram ? `, ${i.monogram}` : ''})`).join('; ') },
          ],
        },
        callback: (response) => {
          const ref = response.reference || reference;
          setConfirmation({ ...snapshot, reference: ref });
          setStatus('paid');
          clearCart();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          // Server re-verifies with Paystack and stores the order (see /api/orders/verify).
          setSaveState('saving');
          fetch('/api/orders/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
            },
            body: JSON.stringify({
              reference: ref,
              items: snapshot.items.map((i) => ({ slug: i.slug, colour: i.material, monogram: i.monogram, quantity: i.quantity })),
              delivery: { method, name: form.name.trim(), phone: form.phone.trim(), address: form.address.trim(), area: form.area.trim() },
            }),
          })
            .then((r) => setSaveState(r.ok ? 'saved' : 'unsaved'))
            .catch(() => setSaveState('unsaved'));
        },
        onClose: () => {
          setStatus('idle');
          setMessage('Payment window closed. Your bag is still saved.');
        },
      });
      handler.openIframe();
    } catch {
      setStatus('error');
      setMessage('We couldn’t reach Paystack. Check your connection and try again.');
    }
  };

  if (status === 'paid' && confirmation) {
    return (
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full text-center flex flex-col items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md">
          <span className="material-symbols-outlined text-[32px]">check</span>
        </div>
        <h1 className="font-display font-bold text-3xl text-on-surface">Payment received — thank you.</h1>
        <p className="text-sm text-on-surface-variant max-w-md">
          Your order reference is <strong className="text-on-surface">{confirmation.reference}</strong>. A receipt has been sent to{' '}
          {confirmation.email}. Keep the reference handy if you need to contact us about this order.
        </p>
        <div className="w-full text-left bg-surface-container-lowest border border-outline-variant/60 rounded-3xl p-6 text-sm space-y-2">
          {confirmation.items.map((i) => (
            <div key={i.key} className="flex justify-between gap-4">
              <span>
                {i.quantity}× {i.name}
              </span>
              <span className="font-bold">{formatNaira(i.price * i.quantity)}</span>
            </div>
          ))}
          <div className="flex justify-between text-on-surface-variant">
            <span>{confirmation.method === 'pickup' ? 'Studio pickup' : 'Lagos courier'}</span>
            <span>{confirmation.deliveryFee === 0 ? 'FREE' : formatNaira(confirmation.deliveryFee)}</span>
          </div>
          <div className="flex justify-between font-bold pt-2 border-t border-outline-variant/60">
            <span>Total paid</span>
            <span className="text-primary">{formatNaira(confirmation.grandTotal)}</span>
          </div>
        </div>
        {saveState === 'saved' && user && (
          <p className="text-sm text-on-surface-variant">
            This order is saved to <Link href="/account?tab=orders" className="text-primary font-semibold hover:underline">your account</Link>.
          </p>
        )}
        {saveState === 'saved' && !user && configured && (
          <p className="text-sm text-on-surface-variant">
            Want to track it later?{' '}
            <Link href="/account/sign-up" className="text-primary font-semibold hover:underline">Create an account</Link> with {confirmation.email}.
          </p>
        )}
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/catalog" className="px-6 py-3 rounded-full bg-primary text-on-primary font-display text-sm font-bold hover:bg-primary-container transition-colors">
            Continue shopping
          </Link>
          {user && (
            <Link href="/account?tab=orders" className="px-6 py-3 rounded-full bg-surface-container-high text-on-surface font-display text-sm font-bold hover:bg-surface-dim transition-colors">
              View my orders
            </Link>
          )}
        </div>
      </section>
    );
  }

  if (hydrated && items.length === 0) {
    return (
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full text-center flex flex-col items-center gap-5">
        <span className="material-symbols-outlined text-[40px] text-on-surface-variant">shopping_bag</span>
        <h1 className="font-display font-bold text-3xl text-on-surface">Your bag is empty</h1>
        <p className="text-sm text-on-surface-variant">Add something from the store, then come back here to check out.</p>
        <Link href="/catalog" className="px-6 py-3 rounded-full bg-primary text-on-primary font-display text-sm font-bold hover:bg-primary-container transition-colors">
          Browse the store
        </Link>
      </section>
    );
  }

  return (
    <section className="flex flex-col w-full" id="view-checkout">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 w-full">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-outline-variant/60 pb-6 mb-8 gap-4">
            <div>
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-primary">Secure checkout</span>
              <h1 className="font-display font-bold text-3xl text-on-surface mt-1">Lightbulb Checkout</h1>
            </div>
            <Link href="/catalog" className="text-xs font-bold text-primary hover:underline">
              ← Keep shopping
            </Link>
          </div>

          <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-outline-variant/60 shadow-sm space-y-8">
              {configured && (
                <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/60 flex flex-wrap items-center justify-between gap-3 text-sm">
                  {user ? (
                    <>
                      <span className="text-on-surface-variant">
                        Signed in as <strong className="text-on-surface">{user.email}</strong>
                      </span>
                      <button type="button" onClick={fillFromAccount} className="px-4 py-2 rounded-full bg-surface-container-lowest border border-outline-variant text-xs font-bold hover:bg-surface-container-high">
                        Use my saved details
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="text-on-surface-variant">Have an account? Sign in to use saved addresses and track this order.</span>
                      <Link href="/account/sign-in?next=/checkout" className="px-4 py-2 rounded-full bg-surface-container-lowest border border-outline-variant text-xs font-bold hover:bg-surface-container-high">
                        Sign in
                      </Link>
                    </>
                  )}
                </div>
              )}

              <fieldset className="space-y-4">
                <legend className="font-display font-bold text-lg text-on-surface mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">person</span>
                  1. Your details
                </legend>
                <Field id="name" label="Full name" autoComplete="name" value={form.name} onChange={update('name')} error={errors.name} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field id="email" label="Email (for receipt)" type="email" autoComplete="email" value={form.email} onChange={update('email')} error={errors.email} />
                  <Field id="phone" label="Phone" type="tel" autoComplete="tel" placeholder="+234" value={form.phone} onChange={update('phone')} error={errors.phone} />
                </div>
              </fieldset>

              <fieldset className="space-y-3">
                <legend className="font-display font-bold text-lg text-on-surface mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">local_shipping</span>
                  2. Delivery
                </legend>
                {[
                  { id: 'courier', title: 'Lagos courier', sub: 'Delivered to your door within Lagos', fee: courierFee === 0 ? 'FREE' : formatNaira(courierFee) },
                  { id: 'pickup', title: 'Studio pickup', sub: 'Collect in person from Ifako-Gbagada, Lagos', fee: 'FREE' },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`p-4 rounded-2xl flex items-center justify-between cursor-pointer border transition-all ${
                      method === opt.id ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'border-outline-variant bg-surface-container-low hover:bg-surface-container'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <input type="radio" name="delivery" value={opt.id} checked={method === opt.id} onChange={() => setMethod(opt.id)} className="accent-primary" />
                      <span>
                        <span className="font-bold text-sm text-on-surface block">{opt.title}</span>
                        <span className="text-xs text-on-surface-variant">{opt.sub}</span>
                      </span>
                    </span>
                    <span className="font-bold text-primary text-sm">{opt.fee}</span>
                  </label>
                ))}

                {method === 'courier' && (
                  <div className="space-y-4 pt-3">
                    <Field id="address" label="Street address" autoComplete="street-address" value={form.address} onChange={update('address')} error={errors.address} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field id="area" label="Area / district" autoComplete="address-level2" value={form.area} onChange={update('area')} error={errors.area} />
                      <div>
                        <label htmlFor="state" className="block text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                          State
                        </label>
                        <input id="state" readOnly value="Lagos" className="w-full p-4 rounded-2xl bg-surface-container-high text-on-surface-variant text-sm font-medium cursor-not-allowed" />
                      </div>
                    </div>
                  </div>
                )}
              </fieldset>

              <div className="space-y-3">
                {!PAYSTACK_KEY && (
                  <p role="status" className="p-4 rounded-2xl bg-tertiary-fixed/50 text-on-tertiary-fixed text-xs font-semibold flex gap-2">
                    <span className="material-symbols-outlined text-[18px]">info</span>
                    Online payment isn&apos;t switched on yet. Add NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY to enable Paystack.
                  </p>
                )}
                {message && (
                  <p role="alert" className={`text-xs font-semibold ${status === 'error' ? 'text-error' : 'text-on-surface-variant'}`}>
                    {message}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={!PAYSTACK_KEY || status === 'paying' || !hydrated}
                  className="w-full py-4 rounded-full bg-primary text-on-primary font-display font-bold text-base shadow-md hover:bg-primary-container transition-all flex items-center justify-center gap-2 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
                >
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                  <span>{status === 'paying' ? 'Opening Paystack…' : `Pay ${formatNaira(grandTotal)} with Paystack`}</span>
                </button>
              </div>
            </div>

            <aside className="lg:col-span-5 bg-surface-container-low p-6 sm:p-8 rounded-3xl border border-outline-variant/60 shadow-sm flex flex-col gap-6 h-fit lg:sticky lg:top-32">
              <h2 className="font-display font-bold text-lg text-on-surface border-b border-outline-variant/60 pb-3">Order summary</h2>
              <ul className="space-y-4">
                {items.map((i) => (
                  <li key={i.key} className="flex gap-3 items-center text-xs">
                    <div className="relative w-14 h-14 shrink-0 rounded-xl overflow-hidden bg-surface-container-high">
                      <ImageWithFallback src={i.image} alt={i.name} category={i.category} className="w-full h-full object-cover" />
                      <span className="absolute -top-0 -right-0 bg-primary text-on-primary text-[10px] font-bold rounded-bl-lg px-1.5">{i.quantity}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-on-surface truncate">{i.name}</p>
                      <p className="text-on-surface-variant truncate">
                        {i.material}
                        {i.monogram ? ` · ${i.monogram}` : ''}
                      </p>
                    </div>
                    <span className="font-bold text-on-surface">{formatNaira(i.price * i.quantity)}</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-2 text-xs border-t border-outline-variant/60 pt-4">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal</span>
                  <span className="font-semibold text-on-surface">{formatNaira(subtotal)}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>{method === 'pickup' ? 'Studio pickup' : 'Lagos courier'}</span>
                  <span className="font-bold text-primary">{deliveryFee === 0 ? 'FREE' : formatNaira(deliveryFee)}</span>
                </div>
              </div>
              <div className="border-t border-outline-variant/60 pt-4 flex items-center justify-between">
                <span className="font-display font-bold text-base text-on-surface">Total</span>
                <span className="font-display font-bold text-2xl text-primary">{formatNaira(grandTotal)}</span>
              </div>
              <p className="text-[11px] text-on-surface-variant flex gap-1.5">
                <span className="material-symbols-outlined text-primary text-[16px]">verified_user</span>
                Card, bank transfer and USSD payments are handled by Paystack. We never see your card details.
              </p>
            </aside>
          </form>
        </div>
      </div>
    </section>
  );
}
