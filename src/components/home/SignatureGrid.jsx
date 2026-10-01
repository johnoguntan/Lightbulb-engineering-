'use client';

import { useState } from 'react';
import ProductCard from '../prototype/ProductCard';
import { PRODUCTS, CATEGORIES } from '@/data/products';

export default function SignatureGrid() {
  const [active, setActive] = useState('All');
  const featured = ['everyday-backpack', 'carry-case', 'weekender-duffel', 'insulated-lunch-cooler'];
  const shown =
    active === 'All'
      ? featured.map((slug) => PRODUCTS.find((p) => p.slug === slug)).filter(Boolean)
      : PRODUCTS.filter((p) => p.category === active).slice(0, 4);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Filter products">
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {shown.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </>
  );
}
