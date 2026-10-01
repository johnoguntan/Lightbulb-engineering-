'use client';

import Link from 'next/link';
import Photo from './Photo';

export default function CraftView() {
  return (
    <section className="route-view flex-col w-full flex" id="view-craft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 w-full">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-primary">Manufacturing Narrative</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-on-surface mt-2 mb-4 leading-tight">
            Born in Ifako-Gbagada. Verified by Lagos hustle.
          </h1>
          <p className="font-body-lg text-base text-on-surface-variant leading-relaxed">
            Lightbulb Engineering was founded on a simple observation: African creatives and enterprise logistics leaders shouldn&rsquo;t have to import fragile, disposable office equipment or sub-par mailers. We combine CNC computer precision with Nigerian hardwood and sugarcane bagasse science.
          </p>
        </div>

        {/* Gallery Grid — real Lightbulb photography */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-16">
          <div className="relative col-span-2 row-span-2 aspect-[4/5] md:aspect-auto rounded-3xl overflow-hidden bg-surface-container">
            <Photo src="/images/lightbulb/weekender-crimson-balcony.jpg" alt="Man with a crimson Lightbulb weekender on a Lagos balcony" sizes="(min-width:768px) 50vw, 100vw" />
          </div>
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-surface-container">
            <Photo src="/images/lightbulb/case-brown-lifestyle-shoulder.jpg" alt="Brown and grey Lightbulb carry case on the shoulder" sizes="(min-width:768px) 25vw, 50vw" />
          </div>
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-surface-container">
            <Photo src="/images/lightbulb/kids-giraffe-lifestyle.jpg" alt="Child holding a giraffe Lightbulb lunch bag" sizes="(min-width:768px) 25vw, 50vw" />
          </div>
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-surface-container">
            <Photo src="/images/lightbulb/pack-garment-cream.jpg" alt="Cream and black branded garment bag by Lightbulb Packaging" sizes="(min-width:768px) 25vw, 50vw" />
          </div>
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-surface-container">
            <Photo src="/images/lightbulb/heather-backpack-brown-worn.jpg" alt="Brown heathered Lightbulb laptop backpack worn outdoors" sizes="(min-width:768px) 25vw, 50vw" position="30% 50%" />
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/60 shadow-sm">
            <span className="font-display text-4xl text-primary font-bold">01</span>
            <h3 className="font-display font-bold text-xl text-on-surface mt-3 mb-3">Material Chemistry</h3>
            <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
              We use zero synthetic resins. Our lapdesks bind via non-toxic water-based food-safe emulsions that prevent off-gassing inside air-conditioned Lagos studios.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/60 shadow-sm">
            <span className="font-display text-4xl text-primary font-bold">02</span>
            <h3 className="font-display font-bold text-xl text-on-surface mt-3 mb-3">Local Supply Chain</h3>
            <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
              85% of our corrugated cardboard pulp is sourced directly from recycled paper mills in Ogun State and processed locally in Ifako-Gbagada.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/60 shadow-sm">
            <span className="font-display text-4xl text-primary font-bold">03</span>
            <h3 className="font-display font-bold text-xl text-on-surface mt-3 mb-3">Mechanical Rigor</h3>
            <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
              Every prototype undergoes a 10,000-cycle drop and load endurance test before joining our commercial catalog.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 rounded-3xl bg-surface-container-low border border-outline-variant/60 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-2xl text-on-surface">Experience Lightbulb Engineering</h3>
            <p className="text-sm text-on-surface-variant mt-1">Visit our retail store catalog or request custom B2B packaging quotes.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/catalog" className="px-6 py-3 rounded-full bg-primary text-on-primary font-display text-xs font-bold shadow-md hover:bg-primary-container transition-all">
              Workspace Store
            </Link>
            <Link href="/b2b" className="px-6 py-3 rounded-full bg-surface-container-high text-on-surface font-display text-xs font-bold hover:bg-surface-container-highest transition-all">
              B2B Packaging
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
