'use client';

export default function TrackingView() {
  return (
    <section className="route-view flex flex-col w-full" id="view-tracking">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
<div className="max-w-4xl mx-auto bg-surface-container-lowest p-8 rounded-3xl shadow-sm">
<div className="flex flex-col sm:flex-row items-baseline justify-between border-b border-surface-container pb-4 mb-6">
<div>
<span className="px-3 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm font-bold">ACTIVE DISPATCH</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">Order #LBC-88219</h2>
</div>
<div className="text-right">
<span className="text-label-sm text-on-surface-variant uppercase block">Estimated Drop-Off</span>
<span className="font-headline-sm text-headline-sm text-primary font-bold">Today, 3:45 PM</span>
</div>
</div>
{/* 4-Stage Stepper */}
<div className="grid grid-cols-4 gap-2 mb-8 text-center">
<div className="flex flex-col items-center">
<div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold mb-2">✓</div>
<span className="font-label-sm text-label-sm font-bold text-on-surface">Bench Machined</span>
<span className="text-[11px] text-on-surface-variant">Ikoyi Studio</span>
</div>
<div className="flex flex-col items-center">
<div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold mb-2">✓</div>
<span className="font-label-sm text-label-sm font-bold text-on-surface">Quality Audit</span>
<span className="text-[11px] text-on-surface-variant">Passed 100%</span>
</div>
<div className="flex flex-col items-center">
<div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold mb-2 animate-bounce">
<span className="material-symbols-outlined text-[20px]">two_wheeler</span>
</div>
<span className="font-label-sm text-label-sm font-bold text-primary">In Transit</span>
<span className="text-[11px] text-on-surface-variant">Falomo Corridor</span>
</div>
<div className="flex flex-col items-center opacity-40">
<div className="w-10 h-10 rounded-full bg-surface-container text-on-surface flex items-center justify-center font-bold mb-2">4</div>
<span className="font-label-sm text-label-sm text-on-surface">Received</span>
<span className="text-[11px] text-on-surface-variant">Lekki Phase 1</span>
</div>
</div>
{/* Map & Rider Info */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-6">
<div className="md:col-span-8">
<div className="w-full h-64 bg-cover bg-center rounded-2xl shadow-inner relative flex items-end p-4" data-location="Lekki Phase 1, Lagos, Nigeria" style={{'backgroundImage': "url('https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg')"}}>
<div className="bg-surface/90 backdrop-blur-md p-3 rounded-3xl shadow-md flex items-center gap-3">
<span className="w-3 h-3 rounded-full bg-primary animate-ping"></span>
<span className="font-body-sm text-body-sm font-bold text-on-surface">Courier 4.2 km away on Ozumba Mbadiwe Way</span>
</div>
</div>
</div>
<div className="md:col-span-4 bg-surface-container-low p-6 rounded-2xl flex flex-col justify-between">
<div>
<span className="text-label-sm uppercase text-on-surface-variant block mb-1">Dispatch Courier</span>
<h4 className="font-headline-sm text-headline-sm text-on-surface">Babatunde F.</h4>
<p className="text-body-sm text-on-surface-variant mb-4">GIG Logistics Express Van #09</p>
<div className="p-3 bg-surface rounded-3xl space-y-1 text-body-sm mb-4">
<div className="flex justify-between"><span className="text-on-surface-variant">Security Code:</span><span className="font-bold text-primary">881-22</span></div>
<div className="flex justify-between"><span className="text-on-surface-variant">Courier Tel:</span><span className="font-bold">+234 812 004 8812</span></div>
</div>
</div>
<button className="w-full py-2.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-bold" type="button">Call Courier Directly</button>
</div>
</div>
</div>
</div>
</section>
  );
}
