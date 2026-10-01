'use client';

import ImageWithFallback from './ImageWithFallback';

export default function PdpView({ activeRoute, onNavigate, openCart, onAddToCart }) {
  return (
    <section className="route-view flex-col w-full flex" id="view-pdp">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="flex items-center gap-2 font-label-sm text-xs text-on-surface-variant mb-6">
          <button className="hover:text-primary font-semibold" onClick={() => onNavigate("catalog")} type="button">Catalog</button>
          <span>/</span>
          <span>Surfaces</span>
          <span>/</span>
          <span className="text-on-surface font-bold">Modular Lapdesk Pro M4</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Image Gallery Split */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="rounded-3xl overflow-hidden bg-surface-container-high aspect-4/3 shadow-md border border-outline-variant/60">
              <ImageWithFallback 
                className="w-full h-full object-cover" 
                alt="Modular Lapdesk Pro M4" 
                src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80"
                icon="laptop_mac"
                category="PRODUCT DETAIL"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-2xl overflow-hidden bg-surface-container aspect-square shadow-sm border border-outline-variant/60">
                <ImageWithFallback 
                  className="w-full h-full object-cover" 
                  alt="Microsuede underside cushions" 
                  src="https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1000&q=80"
                  icon="texture"
                />
              </div>
              <div className="rounded-2xl overflow-hidden bg-surface-container aspect-square shadow-sm border border-outline-variant/60">
                <ImageWithFallback 
                  className="w-full h-full object-cover" 
                  alt="Laser engraving monogram detail" 
                  src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80"
                  icon="edit_note"
                />
              </div>
              <div className="rounded-2xl overflow-hidden bg-surface-container aspect-square shadow-sm border border-outline-variant/60">
                <ImageWithFallback 
                  className="w-full h-full object-cover" 
                  alt="Architect sketching lifestyle" 
                  src="https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=1000&q=80"
                  icon="workstation"
                />
              </div>
            </div>
            {/* Technical Schematics Block */}
            <div className="mt-6 p-6 rounded-3xl bg-surface-container-low border border-outline-variant/60">
              <h4 className="font-display font-bold text-lg text-on-surface mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">architecture</span>
                <span>Dimensional Engineering Manifest</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-3 bg-surface rounded-2xl border border-outline-variant/40">
                  <span className="text-on-surface-variant block font-semibold">Width x Depth</span>
                  <span className="font-bold text-on-surface">540 x 320 mm</span>
                </div>
                <div className="p-3 bg-surface rounded-2xl border border-outline-variant/40">
                  <span className="text-on-surface-variant block font-semibold">Total Weight</span>
                  <span className="font-bold text-on-surface">1,180 Grams</span>
                </div>
                <div className="p-3 bg-surface rounded-2xl border border-outline-variant/40">
                  <span className="text-on-surface-variant block font-semibold">Incline Pitch</span>
                  <span className="font-bold text-on-surface">Fixed 12° Ergonomic</span>
                </div>
                <div className="p-3 bg-surface rounded-2xl border border-outline-variant/40">
                  <span className="text-on-surface-variant block font-semibold">Warranty</span>
                  <span className="font-bold text-on-surface">36 Month Guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Configurator Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/60 shadow-sm space-y-6">
              <div>
                <span className="px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-xs font-bold uppercase tracking-wider">
                  Workspace Surface
                </span>
                <h1 className="font-display font-bold text-3xl text-on-surface mt-3 mb-2 leading-tight">
                  Modular Lapdesk Pro M4
                </h1>
                <p className="text-2xl font-bold text-primary font-display">₦38,500</p>
              </div>

              <p className="text-sm text-on-surface-variant leading-relaxed">
                CNC-milled from sustainable Moso Bamboo with an integrated slate acoustic dampening layer, magnetic anchoring channels for MagLock modules, and passive heat vents engineered for M-series MacBooks and high-end laptops.
              </p>

              {/* Material Substrate Selector */}
              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-3">
                  Select Material Finish: <span className="text-primary font-normal">Moso Bamboo / Slate</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 rounded-2xl border border-primary ring-2 ring-primary/20 bg-primary/5 text-on-surface font-bold shadow-sm flex items-center gap-3 text-xs">
                    <span className="w-5 h-5 rounded-full border border-black/10 shadow-inner bg-[#d8ba93]" />
                    <span>Moso Bamboo</span>
                  </button>
                  <button className="p-3 rounded-2xl border border-outline-variant bg-surface-container-low text-on-surface-variant hover:bg-surface-container flex items-center gap-3 text-xs">
                    <span className="w-5 h-5 rounded-full border border-black/10 shadow-inner bg-[#202224]" />
                    <span>Anodized Black</span>
                  </button>
                </div>
              </div>

              {/* Custom Monogramming Input */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                    Custom Laser Monogramming (Optional)
                  </label>
                  <span className="text-[10px] text-primary font-bold">COMPLIMENTARY</span>
                </div>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter initials (e.g. T.A. / LAGOS)"
                  className="w-full px-4 py-3 rounded-2xl bg-surface-container-low border border-outline-variant text-on-surface font-display text-sm focus:outline-none focus:ring-2 focus:ring-primary uppercase tracking-widest"
                />
              </div>

              {/* Add to Bag CTA */}
              <button
                onClick={() => {
                  if (onAddToCart) {
                    onAddToCart({ name: 'Modular Lapdesk Pro M4', price: 38500, material: 'Moso Bamboo / Slate' });
                  } else if (openCart) {
                    openCart();
                  }
                }}
                className="w-full py-4 rounded-full bg-primary text-on-primary font-display font-bold text-base shadow-md hover:bg-primary-container transition-all flex items-center justify-center gap-2 hover:shadow-lg"
                type="button"
              >
                <span>ADD TO WORKSPACE BAG</span>
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              </button>

              <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/60 flex items-center gap-3 text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-[24px]">local_shipping</span>
                <div>
                  <p className="font-bold text-on-surface">Lagos Courier Delivery: Flat ₦3,500</p>
                  <p className="text-[11px]">Free delivery automatically unlocked on orders over ₦50,000.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
