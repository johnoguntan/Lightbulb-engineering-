'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from './ProductCard';
import Photo from './Photo';
import { PRODUCTS, CATEGORIES } from '@/data/products';

export default function CatalogView() {
  const params = useSearchParams();
  const fromUrl = params?.get('category');
  const [active, setActiveState] = useState(CATEGORIES.includes(fromUrl) ? fromUrl : 'All');
  const setActive = (c) => {
    setActiveState(c);
    const url = new URL(window.location.href);
    if (c === 'All') url.searchParams.delete('category');
    else url.searchParams.set('category', c);
    window.history.replaceState(null, '', url);
  };
  const shown = PRODUCTS.filter((p) => active === 'All' || p.category === active);

  return (
    <>
      <section className="relative w-full h-[42vh] min-h-[280px] flex items-end overflow-hidden bg-inverse-surface">
        <Photo src="/images/lightbulb/weekender-crimson-colonnade.jpg" alt="A man in a beret holding a crimson Lightbulb weekender under a Lagos colonnade" priority sizes="100vw" position="50% 35%" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-black/10" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10 text-white">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-fixed-dim">Lightbulb Concepts</p>
          <h1 className="font-display font-medium text-4xl sm:text-5xl mt-2">Bags &amp; Carry</h1>
          <p className="text-sm sm:text-base text-white/85 mt-2 max-w-lg">Backpacks, cases, coolers, totes and kids’ bags, made in Lagos.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={active === c}
                onClick={() => setActive(c)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                  active === c ? 'bg-on-surface text-surface' : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface border border-outline-variant/50'
                }`}
              >
                {c === 'All' ? 'All carry' : c}
              </button>
            ))}
          </div>
          <p className="text-xs text-on-surface-variant">
            Showing <strong className="text-on-surface">{shown.length}</strong> of {PRODUCTS.length} products ·{' '}
            <Link href="/compare" className="text-primary font-semibold hover:underline">Compare</Link>
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {shown.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i < 2} sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
          ))}
        </div>
      </section>
    </>
  );
}
