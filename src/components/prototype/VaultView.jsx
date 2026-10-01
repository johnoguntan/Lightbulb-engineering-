'use client';

import Link from 'next/link';

export default function VaultView() {
  return (
    <section className="route-view flex flex-col w-full" id="view-vault">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
<div className="p-8 rounded-3xl bg-surface-container-lowest shadow-sm mb-8">
<div className="flex flex-col sm:flex-row items-center justify-between gap-6">
<div className="flex items-center gap-4">
<div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-[24px]">TA</div>
<div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">Verified Member Account</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface">Tayo Adeleke</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Lagos Creative Syndicate · Active Tier: Studio Founder</p>
</div>
</div>
<div className="flex items-center gap-4">
<div className="p-4 rounded-2xl bg-surface-container-low text-center">
<span className="text-label-sm text-on-surface-variant block uppercase">Craft Points</span>
<span className="font-display text-[28px] text-primary font-bold">850 pts</span>
</div>
<button className="px-5 py-3 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-bold hover:bg-surface-container-high transition-colors" type="button">
              Redeem Perks
            </button>
</div>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
{/* Left: Registered Warranties */}
<div className="lg:col-span-6 bg-surface-container-lowest p-6 rounded-2xl shadow-sm">
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">verified_user</span>
<span className="">Registered Hardware Passports</span>
</h3>
<div className="p-4 rounded-3xl bg-surface-container-low mb-3 flex items-center justify-between">
<div>
<p className="font-bold text-on-surface">Modular Lapdesk Pro M4</p>
<p className="text-[12px] text-on-surface-variant">Serial: #LB-2024-9982 · Active till Nov 2027</p>
</div>
<span className="px-2.5 py-1 rounded-xl bg-surface font-label-sm text-label-sm text-primary font-bold">Healthy</span>
</div>
<div className="p-4 rounded-3xl bg-surface-container-low flex items-center justify-between">
<div>
<p className="font-bold text-on-surface">Field Messenger Bag</p>
<p className="text-[12px] text-on-surface-variant">Serial: #LB-2023-4110 · Active till Aug 2026</p>
</div>
<span className="px-2.5 py-1 rounded-xl bg-surface font-label-sm text-label-sm text-primary font-bold">Healthy</span>
</div>
</div>
{/* Right: Recent Dispatches */}
<div className="lg:col-span-6 bg-surface-container-lowest p-6 rounded-2xl shadow-sm">
<div className="flex items-center justify-between mb-4">
<h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-primary">receipt_long</span>
<span className="">Dispatches &amp; Orders</span>
</h3>
<Link href="/tracking" className="text-primary font-label-sm text-label-sm font-bold hover:underline">Track Active</Link>
</div>
<div className="space-y-3">
<div className="p-4 rounded-3xl bg-surface-container-low flex items-center justify-between">
<div>
<span className="font-bold text-on-surface block">#LBC-88219 (Out for Delivery)</span>
<span className="text-[12px] text-on-surface-variant">1x Lapdesk Pro, 1x MagLock Anchors</span>
</div>
<Link href="/tracking" className="px-3 py-1.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm">Track</Link>
</div>
<div className="p-4 rounded-3xl bg-surface-container-low flex items-center justify-between">
<div>
<span className="font-bold text-on-surface block">#LBC-77014 (Delivered Sep 28)</span>
<span className="text-[12px] text-on-surface-variant">2x Artisan Chow &amp; Desk Mat</span>
</div>
<span className="text-on-surface-variant font-label-sm text-label-sm">₦29,000</span>
</div>
</div>
</div>
</div>
</div>
</section>
  );
}
