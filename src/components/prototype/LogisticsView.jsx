'use client';

export default function LogisticsView() {
  return (
    <section className="route-view flex flex-col w-full" id="view-logistics">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
<div className="mb-8">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">Industrial Distribution Infrastructure</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface">Logistics Hubs &amp; Dock Facilities</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Real-time clearance parameters, vehicle height clearances, and dock marshals across South-West Nigeria.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
{/* Hub 1 */}
<div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-3">
<span className="px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm font-bold">PRIMARY HUB</span>
<span className="font-label-sm text-label-sm text-primary font-bold">DOCK 01-04</span>
</div>
<h3 className="font-headline-md text-[22px] text-on-surface mb-2">Ikeja Central Distribution Hub</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-4">Plot 12 Commercial Avenue, Ikeja Industrial Estate, Lagos.</p>
<div className="space-y-2 text-body-sm bg-surface-container-low p-4 rounded-3xl mb-4">
<div className="flex justify-between"><span className="text-on-surface-variant">Bay Clearance:</span><span className="font-bold">4.8m (Container Ready)</span></div>
<div className="flex justify-between"><span className="text-on-surface-variant">Daily Throughput:</span><span className="font-bold">40,000 Carton Units</span></div>
<div className="flex justify-between"><span className="text-on-surface-variant">Pallet Scale:</span><span className="font-bold">Automated 2,000kg</span></div>
</div>
</div>
<button className="w-full py-2.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-bold hover:bg-primary hover:text-on-primary transition-all" type="button">Schedule Freight Pickup</button>
</div>
{/* Hub 2 */}
<div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-3">
<span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-bold">COASTAL TERMINAL</span>
<span className="font-label-sm text-label-sm text-on-surface font-bold">DOCK 05</span>
</div>
<h3 className="font-headline-md text-[22px] text-on-surface mb-2">Lekki Phase 1 Fulfillment Bay</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-4">Admiralty Way Freight Wharf, Lekki Peninsula, Lagos.</p>
<div className="space-y-2 text-body-sm bg-surface-container-low p-4 rounded-3xl mb-4">
<div className="flex justify-between"><span className="text-on-surface-variant">Bay Clearance:</span><span className="font-bold">3.2m (Van &amp; Box Trucks)</span></div>
<div className="flex justify-between"><span className="text-on-surface-variant">Dispatch Velocity:</span><span className="font-bold">&lt; 90 Min Courier SLAs</span></div>
<div className="flex justify-between"><span className="text-on-surface-variant">Cold Storage:</span><span className="font-bold">Available (Pharmaceuticals)</span></div>
</div>
</div>
<button className="w-full py-2.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-bold hover:bg-primary hover:text-on-primary transition-all" type="button">Book Dock Bay</button>
</div>
{/* Hub 3 */}
<div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-3">
<span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-bold">CORRIDOR DEPOT</span>
<span className="font-label-sm text-label-sm text-on-surface font-bold">DOCK 08-12</span>
</div>
<h3 className="font-headline-md text-[22px] text-on-surface mb-2">Sagamu Interchange Staging Facility</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-4">Lagos-Ibadan Expressway Junction, Ogun/Lagos border.</p>
<div className="space-y-2 text-body-sm bg-surface-container-low p-4 rounded-3xl mb-4">
<div className="flex justify-between"><span className="text-on-surface-variant">Bay Clearance:</span><span className="font-bold">Unlimited Open Apron</span></div>
<div className="flex justify-between"><span className="text-on-surface-variant">Capacity:</span><span className="font-bold">120 Heavy Articulated Trucks</span></div>
<div className="flex justify-between"><span className="text-on-surface-variant">Interstate Access:</span><span className="font-bold">North &amp; East Trunk Routes</span></div>
</div>
</div>
<button className="w-full py-2.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-bold hover:bg-primary hover:text-on-primary transition-all" type="button">Direct Waybill Route</button>
</div>
</div>
</div>
</section>
  );
}
