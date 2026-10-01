'use client';

import { useState } from 'react';
import Link from 'next/link';
import Photo from '../prototype/Photo';
import { Field, Alert, friendlyAuthError } from './ui';
import { useAuth } from '@/context/AuthContext';
import { useCart, formatNaira } from '@/context/CartContext';
import { getSupabase } from '@/lib/supabase';
import { PRODUCTS } from '@/data/products';
import { useTable, formatDate, ORDER_STATUS, QUOTE_STATUS } from './useAccountData';

/* ---------- shared bits ---------- */

function Panel({ title, action, children }) {
  return (
    <section>
      <div className="flex items-center justify-between gap-4 mb-5">
        <h2 className="font-display font-medium text-2xl text-on-surface">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function Empty({ icon, title, body, cta }) {
  return (
    <div className="rounded-3xl border border-dashed border-outline-variant bg-surface-container-lowest p-10 text-center flex flex-col items-center gap-3">
      <span className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center">
        <span className="material-symbols-outlined text-[26px] text-on-surface-variant">{icon}</span>
      </span>
      <p className="font-display font-bold text-lg text-on-surface">{title}</p>
      <p className="text-sm text-on-surface-variant max-w-sm">{body}</p>
      {cta}
    </div>
  );
}

function Badge({ status, map }) {
  const s = map[status] || { label: status, tone: 'bg-surface-container-high text-on-surface' };
  return <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${s.tone}`}>{s.label}</span>;
}

function Loading() {
  return (
    <div className="space-y-3" role="status" aria-label="Loading">
      {[0, 1].map((i) => (
        <div key={i} className="h-24 rounded-3xl bg-surface-container animate-pulse" />
      ))}
    </div>
  );
}

const productBySlug = (slug) => PRODUCTS.find((p) => p.slug === slug);
const imageFor = (item) => {
  const p = productBySlug(item.slug);
  const c = p?.colours.find((col) => col.name === item.colour) || p?.colours[0];
  return c?.images[0] || null;
};

const primaryBtn = 'px-5 py-3 rounded-full bg-primary text-on-primary font-display text-sm font-bold hover:bg-primary-container transition-colors disabled:opacity-50';
const ghostBtn = 'px-4 py-2.5 rounded-full bg-surface-container-lowest border border-outline-variant text-sm font-semibold text-on-surface hover:bg-surface-container-high transition-colors';

/* ---------- Overview ---------- */

export function OverviewPanel({ goTo }) {
  const orders = useTable('orders');
  const addresses = useTable('addresses');
  const quotes = useTable('quote_requests');
  const latest = orders.rows[0];
  const openQuotes = quotes.rows.filter((q) => q.status !== 'completed').length;

  const stats = [
    { label: 'Orders', value: orders.rows.length, tab: 'orders', icon: 'receipt_long' },
    { label: 'Saved addresses', value: addresses.rows.length, tab: 'addresses', icon: 'home_pin' },
    { label: 'Open quotes', value: openQuotes, tab: 'business', icon: 'package_2' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {stats.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => goTo(s.tab)}
            className="text-left rounded-3xl bg-surface-container-lowest border border-outline-variant/60 p-4 sm:p-6 hover:shadow-md transition-shadow"
          >
            <span className="material-symbols-outlined text-primary text-[22px]">{s.icon}</span>
            <p className="font-display font-bold text-2xl sm:text-3xl text-on-surface mt-2">{s.value}</p>
            <p className="text-[11px] sm:text-xs text-on-surface-variant font-semibold">{s.label}</p>
          </button>
        ))}
      </div>

      <Panel title="Latest order">
        {orders.loading ? (
          <Loading />
        ) : latest ? (
          <OrderCard order={latest} />
        ) : (
          <Empty
            icon="shopping_bag"
            title="No orders yet"
            body="When you place an order, it’ll show up here with its status from our workshop."
            cta={<Link href="/catalog" className={primaryBtn}>Start shopping</Link>}
          />
        )}
      </Panel>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/catalog" className="group relative aspect-[16/9] rounded-3xl overflow-hidden bg-surface-container">
          <Photo src="/images/lightbulb/backpack-navy-lifestyle-shoulder.jpg" alt="" sizes="(min-width:640px) 40vw, 100vw" position="50% 30%" className="transition-transform duration-700 group-hover:scale-[1.04]" />
          <span className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <span className="absolute bottom-4 left-5 text-white font-display font-bold">Shop bags &amp; carry →</span>
        </Link>
        <Link href="/b2b#quote" className="group relative aspect-[16/9] rounded-3xl overflow-hidden bg-surface-container">
          <Photo src="/images/lightbulb/pack-garment-red.jpg" alt="" sizes="(min-width:640px) 40vw, 100vw" className="transition-transform duration-700 group-hover:scale-[1.04]" />
          <span className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <span className="absolute bottom-4 left-5 text-white font-display font-bold">Request a packaging quote →</span>
        </Link>
      </div>
    </div>
  );
}

/* ---------- Orders ---------- */

function OrderCard({ order }) {
  const { addItem } = useCart();
  const [open, setOpen] = useState(false);
  const items = Array.isArray(order.items) ? order.items : [];
  const reorderable = items.filter((i) => productBySlug(i.slug)?.purchasable);

  const buyAgain = () => {
    reorderable.forEach((i, idx) =>
      addItem(productBySlug(i.slug), { material: i.colour, monogram: i.monogram, quantity: i.quantity, open: idx === reorderable.length - 1 })
    );
  };

  return (
    <article className="rounded-3xl bg-surface-container-lowest border border-outline-variant/60 overflow-hidden">
      <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex -space-x-3">
          {items.slice(0, 3).map((i, idx) => (
            <div key={idx} className="relative w-14 h-14 rounded-2xl overflow-hidden bg-surface-container ring-2 ring-surface-container-lowest">
              <Photo src={imageFor(i)} alt={i.name} sizes="56px" label="" />
            </div>
          ))}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-display font-bold text-on-surface">Order {order.reference}</p>
            <Badge status={order.status} map={ORDER_STATUS} />
          </div>
          <p className="text-xs text-on-surface-variant mt-1">
            {formatDate(order.created_at)} · {items.reduce((a, i) => a + (i.quantity || 1), 0)} item(s) · {formatNaira(order.total)}
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" className={ghostBtn} onClick={() => setOpen((v) => !v)} aria-expanded={open}>
            {open ? 'Hide details' : 'Details'}
          </button>
          {reorderable.length > 0 && (
            <button type="button" className={ghostBtn} onClick={buyAgain}>
              Buy again
            </button>
          )}
        </div>
      </div>

      {open && (
        <div className="border-t border-outline-variant/50 p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <ul className="space-y-3">
            {items.map((i, idx) => (
              <li key={idx} className="flex justify-between gap-4">
                <span>
                  {i.quantity}× {i.name}
                  <span className="block text-xs text-on-surface-variant">
                    {i.colour}
                    {i.monogram ? ` · Monogram ${i.monogram}` : ''}
                  </span>
                </span>
                <span className="font-semibold">{formatNaira(i.unit_price * i.quantity)}</span>
              </li>
            ))}
            <li className="flex justify-between text-on-surface-variant border-t border-outline-variant/50 pt-3">
              <span>Delivery</span>
              <span>{order.delivery_fee ? formatNaira(order.delivery_fee) : 'FREE'}</span>
            </li>
            <li className="flex justify-between font-bold">
              <span>Total paid</span>
              <span className="text-primary">{formatNaira(order.total)}</span>
            </li>
          </ul>
          <div className="text-on-surface-variant space-y-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface">
              {order.delivery?.method === 'pickup' ? 'Studio pickup' : 'Delivering to'}
            </p>
            <p>{order.delivery?.name}</p>
            {order.delivery?.method !== 'pickup' && (
              <p>
                {order.delivery?.address}, {order.delivery?.area}, Lagos
              </p>
            )}
            <p>{order.delivery?.phone}</p>
          </div>
        </div>
      )}
    </article>
  );
}

export function OrdersPanel() {
  const { rows, loading, error } = useTable('orders');
  return (
    <Panel title="Orders">
      <Alert>{error}</Alert>
      {loading ? (
        <Loading />
      ) : rows.length ? (
        <div className="space-y-4">
          {rows.map((o) => (
            <OrderCard key={o.id} order={o} />
          ))}
        </div>
      ) : (
        <Empty
          icon="receipt_long"
          title="No orders yet"
          body="Orders you place while signed in appear here, with status updates from the workshop."
          cta={<Link href="/catalog" className={primaryBtn}>Browse the shop</Link>}
        />
      )}
    </Panel>
  );
}

/* ---------- Addresses ---------- */

const EMPTY_ADDRESS = { label: 'Home', name: '', phone: '', address: '', area: '', is_default: false };

function AddressForm({ initial, onCancel, onSaved }) {
  const [form, setForm] = useState(initial || EMPTY_ADDRESS);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = {};
    if (form.name.trim().length < 2) found.name = 'Enter the recipient’s name.';
    if (form.phone.replace(/\D/g, '').length < 10) found.phone = 'Enter a reachable phone number.';
    if (form.address.trim().length < 5) found.address = 'Enter a street address.';
    if (form.area.trim().length < 2) found.area = 'Enter the area or district.';
    setErrors(found);
    if (Object.keys(found).length) return;

    const sb = getSupabase();
    if (!sb) return setMessage('Accounts aren’t switched on yet, so addresses can’t be saved.');
    setBusy(true);
    const payload = {
      label: form.label.trim() || 'Home',
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      area: form.area.trim(),
      state: 'Lagos',
      is_default: form.is_default,
    };
    if (payload.is_default) await sb.from('addresses').update({ is_default: false }).eq('is_default', true);
    const { error } = form.id ? await sb.from('addresses').update(payload).eq('id', form.id) : await sb.from('addresses').insert(payload);
    setBusy(false);
    if (error) return setMessage('We couldn’t save that address. Please try again.');
    onSaved();
  };

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-3xl bg-surface-container-lowest border border-outline-variant/60 p-5 sm:p-6 space-y-4">
      <Alert>{message}</Alert>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field id="addr-label" label="Label" placeholder="Home, Office…" value={form.label} onChange={set('label')} />
        <Field id="addr-name" label="Recipient name" autoComplete="name" value={form.name} onChange={set('name')} error={errors.name} />
      </div>
      <Field id="addr-address" label="Street address" autoComplete="street-address" value={form.address} onChange={set('address')} error={errors.address} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field id="addr-area" label="Area / district" autoComplete="address-level2" value={form.area} onChange={set('area')} error={errors.area} />
        <Field id="addr-phone" label="Phone" type="tel" autoComplete="tel" placeholder="+234" value={form.phone} onChange={set('phone')} error={errors.phone} />
      </div>
      <label className="flex items-center gap-2 text-sm text-on-surface">
        <input type="checkbox" checked={form.is_default} onChange={set('is_default')} className="w-4 h-4 accent-primary" />
        Use as my default delivery address
      </label>
      <div className="flex gap-2">
        <button type="submit" className={primaryBtn} disabled={busy}>
          {busy ? 'Saving…' : form.id ? 'Save changes' : 'Save address'}
        </button>
        <button type="button" className={ghostBtn} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export function AddressesPanel() {
  const { rows, loading, error, reload } = useTable('addresses', { order: 'is_default' });
  const [editing, setEditing] = useState(null); // null | 'new' | row

  const remove = async (id) => {
    const sb = getSupabase();
    if (!sb) return;
    await sb.from('addresses').delete().eq('id', id);
    reload();
  };

  const done = () => {
    setEditing(null);
    reload();
  };

  return (
    <Panel
      title="Saved addresses"
      action={
        !editing && (
          <button type="button" className={primaryBtn} onClick={() => setEditing('new')}>
            + Add address
          </button>
        )
      }
    >
      <Alert>{error}</Alert>
      {editing && (
        <div className="mb-6">
          <AddressForm initial={editing === 'new' ? null : editing} onCancel={() => setEditing(null)} onSaved={done} />
        </div>
      )}
      {loading ? (
        <Loading />
      ) : rows.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rows.map((a) => (
            <article key={a.id} className="rounded-3xl bg-surface-container-lowest border border-outline-variant/60 p-5 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">{a.label.toLowerCase().includes('office') ? 'apartment' : 'home'}</span>
                <p className="font-display font-bold text-on-surface">{a.label}</p>
                {a.is_default && <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-[10px] font-bold">Default</span>}
              </div>
              <address className="not-italic text-sm text-on-surface-variant leading-relaxed">
                {a.name}
                <br />
                {a.address}, {a.area}, {a.state}
                <br />
                {a.phone}
              </address>
              <div className="flex gap-2 mt-auto">
                <button type="button" className={ghostBtn} onClick={() => setEditing(a)}>
                  Edit
                </button>
                <button type="button" className={`${ghostBtn} hover:!bg-error-container hover:!text-on-error-container`} onClick={() => remove(a.id)}>
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        !editing && (
          <Empty
            icon="home_pin"
            title="No saved addresses"
            body="Save your home or office so checkout takes seconds next time."
            cta={
              <button type="button" className={primaryBtn} onClick={() => setEditing('new')}>
                Add an address
              </button>
            }
          />
        )
      )}
    </Panel>
  );
}

/* ---------- Business & quotes ---------- */

export function BusinessPanel() {
  const { user } = useAuth();
  const { rows, loading, error, reload } = useTable('quote_requests');
  const [notice, setNotice] = useState('');
  const company = user?.user_metadata?.company;

  const requestAgain = async (q) => {
    const sb = getSupabase();
    if (!sb) return;
    const { error: err } = await sb.from('quote_requests').insert({
      company: q.company,
      product: q.product,
      quantity: q.quantity,
      details: { ...q.details, reorder_of: q.id },
    });
    setNotice(err ? 'We couldn’t send that reorder. Please try again.' : 'Reorder request sent — we’ll confirm pricing and dates shortly.');
    if (!err) reload();
  };

  return (
    <Panel title={company ? `${company} — packaging` : 'Business & quotes'} action={<Link href="/b2b#quote" className={primaryBtn}>New quote</Link>}>
      <Alert tone={notice.startsWith('We couldn’t') ? 'error' : 'info'}>{notice}</Alert>
      <Alert>{error}</Alert>
      {loading ? (
        <Loading />
      ) : rows.length ? (
        <div className="overflow-x-auto rounded-3xl border border-outline-variant/60 bg-surface-container-lowest mt-2">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-on-surface-variant">
                <th scope="col" className="p-4">Product</th>
                <th scope="col" className="p-4">Quantity</th>
                <th scope="col" className="p-4">Requested</th>
                <th scope="col" className="p-4">Status</th>
                <th scope="col" className="p-4"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((q) => (
                <tr key={q.id} className="border-t border-outline-variant/40">
                  <td className="p-4 font-semibold text-on-surface">{q.product}</td>
                  <td className="p-4">{Number(q.quantity).toLocaleString('en-NG')}</td>
                  <td className="p-4 text-on-surface-variant">{formatDate(q.created_at)}</td>
                  <td className="p-4"><Badge status={q.status} map={QUOTE_STATUS} /></td>
                  <td className="p-4 text-right">
                    {q.status === 'completed' && (
                      <button type="button" className={ghostBtn} onClick={() => requestAgain(q)}>
                        Reorder
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-stretch">
          <div className="md:col-span-3">
            <Empty
              icon="package_2"
              title="No packaging quotes yet"
              body="Garment bags, drawstring bags and custom packaging with your logo. Request a quote and track it here."
              cta={<Link href="/b2b#quote" className={primaryBtn}>Request a quote</Link>}
            />
          </div>
          <div className="md:col-span-2 relative min-h-[220px] rounded-3xl overflow-hidden bg-surface-container">
            <Photo src="/images/lightbulb/pack-garment-white.jpg" alt="Branded garment bag by Lightbulb Packaging" sizes="(min-width:768px) 30vw, 100vw" position="50% 35%" />
          </div>
        </div>
      )}
    </Panel>
  );
}

/* ---------- Profile & password ---------- */

export function ProfilePanel() {
  const { user, updateProfile, updatePassword, configured } = useAuth();
  const meta = user?.user_metadata || {};
  const [profile, setProfile] = useState({ full_name: meta.full_name || '', phone: meta.phone || '', company: meta.company || '' });
  const [pw, setPw] = useState({ next: '', confirm: '' });
  const [profileMsg, setProfileMsg] = useState({ tone: 'info', text: '' });
  const [pwMsg, setPwMsg] = useState({ tone: 'info', text: '' });
  const [busy, setBusy] = useState('');

  const saveProfile = async (e) => {
    e.preventDefault();
    if (profile.full_name.trim().length < 2) return setProfileMsg({ tone: 'error', text: 'Enter your full name.' });
    setBusy('profile');
    const { error } = await updateProfile({ full_name: profile.full_name.trim(), phone: profile.phone.trim(), company: profile.company.trim() });
    setBusy('');
    setProfileMsg(error ? { tone: 'error', text: friendlyAuthError(error.message) } : { tone: 'info', text: 'Profile saved.' });
  };

  const savePassword = async (e) => {
    e.preventDefault();
    if (pw.next.length < 8 || !/[0-9]/.test(pw.next) || !/[a-zA-Z]/.test(pw.next)) {
      return setPwMsg({ tone: 'error', text: 'Use at least 8 characters, with a letter and a number.' });
    }
    if (pw.next !== pw.confirm) return setPwMsg({ tone: 'error', text: 'The two passwords don’t match.' });
    setBusy('pw');
    const { error } = await updatePassword(pw.next);
    setBusy('');
    if (error) return setPwMsg({ tone: 'error', text: friendlyAuthError(error.message) });
    setPw({ next: '', confirm: '' });
    setPwMsg({ tone: 'info', text: 'Password updated.' });
  };

  const card = 'rounded-3xl bg-surface-container-lowest border border-outline-variant/60 p-5 sm:p-6 space-y-4';

  return (
    <div className="space-y-8">
      <Panel title="Profile">
        <form onSubmit={saveProfile} noValidate className={card}>
          <Alert tone={profileMsg.tone}>{profileMsg.text}</Alert>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field id="p-name" label="Full name" autoComplete="name" value={profile.full_name} onChange={(e) => setProfile((p) => ({ ...p, full_name: e.target.value }))} />
            <Field id="p-phone" label="Phone" type="tel" autoComplete="tel" value={profile.phone} onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field id="p-email" label="Email" type="email" value={user?.email || ''} readOnly disabled hint="Contact us to change the email on your account." />
            <Field id="p-company" label="Company (optional)" autoComplete="organization" value={profile.company} onChange={(e) => setProfile((p) => ({ ...p, company: e.target.value }))} />
          </div>
          <button type="submit" className={primaryBtn} disabled={!configured || busy === 'profile'}>
            {busy === 'profile' ? 'Saving…' : 'Save profile'}
          </button>
        </form>
      </Panel>

      <Panel title="Password">
        <form onSubmit={savePassword} noValidate className={card}>
          <Alert tone={pwMsg.tone}>{pwMsg.text}</Alert>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field id="p-new" label="New password" type="password" autoComplete="new-password" value={pw.next} onChange={(e) => setPw((p) => ({ ...p, next: e.target.value }))} />
            <Field id="p-confirm" label="Confirm new password" type="password" autoComplete="new-password" value={pw.confirm} onChange={(e) => setPw((p) => ({ ...p, confirm: e.target.value }))} />
          </div>
          <button type="submit" className={primaryBtn} disabled={!configured || busy === 'pw'}>
            {busy === 'pw' ? 'Updating…' : 'Update password'}
          </button>
        </form>
      </Panel>
    </div>
  );
}
