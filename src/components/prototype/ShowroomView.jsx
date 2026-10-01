'use client';

export default function ShowroomView() {
  return (
    <section className="route-view flex flex-col w-full" id="view-showroom">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
<div className="mb-8">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">Direct Material Verification</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface">Book a Lagos Studio Lab Session</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Examine wood billets, test box crush loads, and audit tactile surfaces in person at Old Ikoyi.</p>
</div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
{/* Booking Form */}
<div className="lg:col-span-7 bg-surface-container-lowest p-8 rounded-2xl shadow-sm">
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-4">1. Choose Consultation Focus</h3>
<div className="grid grid-cols-2 gap-3 mb-6">
<label className="p-4 rounded-3xl bg-surface-container-low flex flex-col gap-1 cursor-pointer ring-2 ring-primary">
<input defaultChecked="" className="text-primary hidden" name="lab-type" type="radio"/>
<span className="font-bold text-on-surface">Packaging Stress Audit</span>
<span className="text-body-sm text-on-surface-variant">Corrugated drop tests, fluting weights, custom sample kits.</span>
</label>
<label className="p-4 rounded-3xl bg-surface-container-low flex flex-col gap-1 cursor-pointer hover:bg-surface-container">
<input className="text-primary hidden" name="lab-type" type="radio"/>
<span className="font-bold text-on-surface">Workspace Ergonomics Lab</span>
<span className="text-body-sm text-on-surface-variant">Lapdesk angle fittings, custom monogram sampling, wood grain audits.</span>
</label>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">2. Available Dates (October 2025)</h3>
<div className="grid grid-cols-5 gap-2 mb-6">
<button className="p-3 rounded-3xl bg-surface-container-low text-center hover:bg-primary hover:text-on-primary transition-all" type="button">
<span className="text-[11px] block">MON</span>
<span className="font-bold text-[18px]">20</span>
</button>
<button className="p-3 rounded-3xl bg-surface-container-low text-center hover:bg-primary hover:text-on-primary transition-all" type="button">
<span className="text-[11px] block">TUE</span>
<span className="font-bold text-[18px]">21</span>
</button>
<button className="p-3 rounded-3xl bg-primary text-on-primary text-center font-bold shadow-sm" type="button">
<span className="text-[11px] block">WED</span>
<span className="font-bold text-[18px]">22</span>
</button>
<button className="p-3 rounded-3xl bg-surface-container-low text-center hover:bg-primary hover:text-on-primary transition-all" type="button">
<span className="text-[11px] block">THU</span>
<span className="font-bold text-[18px]">23</span>
</button>
<button className="p-3 rounded-3xl bg-surface-container-low text-center hover:bg-primary hover:text-on-primary transition-all" type="button">
<span className="text-[11px] block">FRI</span>
<span className="font-bold text-[18px]">24</span>
</button>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-3">3. Time Slot</h3>
<div className="grid grid-cols-3 gap-2 mb-6">
<button className="p-2.5 rounded-2xl bg-surface-container font-label-sm text-label-sm font-bold" type="button">10:00 AM</button>
<button className="p-2.5 rounded-2xl bg-primary text-on-primary font-label-sm text-label-sm font-bold" type="button">02:00 PM</button>
<button className="p-2.5 rounded-2xl bg-surface-container font-label-sm text-label-sm font-bold" type="button">04:30 PM</button>
</div>
<div className="space-y-4 mb-6">
<div>
<label className="block font-label-sm text-label-sm uppercase text-on-surface mb-1">Company / Individual Name</label>
<input className="w-full p-3 rounded-3xl bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary" type="text" defaultValue="Tayo Adeleke"/>
</div>
<div>
<label className="block font-label-sm text-label-sm uppercase text-on-surface mb-1">Official Work Email</label>
<input className="w-full p-3 rounded-3xl bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary" type="email" defaultValue="tayo@lagoscreatives.io"/>
</div>
</div>
<button className="w-full py-4 rounded-full bg-primary text-on-primary font-headline-sm text-[16px] font-bold shadow-md hover:bg-primary-container transition-all" type="button">
            Confirm Studio Lab Pass
          </button>
</div>
{/* Right Pass Preview */}
<div className="lg:col-span-5 flex flex-col justify-center">
<div className="p-8 rounded-3xl bg-surface-container-high shadow-lg relative overflow-hidden">
<div className="flex items-center justify-between border-b border-surface-container pb-4 mb-6">
<div>
<span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold">Studio Pass</span>
<h4 className="font-headline-sm text-headline-sm text-on-surface">Material Lab Old Ikoyi</h4>
</div>
<span className="material-symbols-outlined text-[32px] text-primary">qr_code_2</span>
</div>
<div className="space-y-4 mb-6 font-body-sm">
<div>
<span className="text-on-surface-variant block text-label-sm">Visitor Name</span>
<span className="font-bold text-on-surface text-[16px]">Tayo Adeleke (Creative Lead)</span>
</div>
<div>
<span className="text-on-surface-variant block text-label-sm">Scheduled Date &amp; Time</span>
<span className="font-bold text-on-surface">Wednesday, October 22, 2025 at 02:00 PM</span>
</div>
<div>
<span className="text-on-surface-variant block text-label-sm">Location Address</span>
<span className="text-on-surface">15 Salawu Onikoyi, Off Macdonald Rd, Old Ikoyi, Lagos</span>
</div>
</div>
<div className="p-4 rounded-3xl bg-surface text-center">
<p className="font-label-sm text-label-sm text-on-surface-variant">Present this digital clearance pass upon arrival at security gate.</p>
</div>
</div>
</div>
</div>
</div>
</section>
  );
}
