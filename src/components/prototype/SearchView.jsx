'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';
import { PRODUCTS, CATEGORIES } from '@/data/products';

export default function SearchView() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const q = query.trim().toLowerCase();

  const results = PRODUCTS.filter((p) => {
    const inCategory = activeCategory === 'All' || p.category === activeCategory;
    const haystack = [p.name, p.description, p.categoryLabel, p.category, ...p.colours.map((c) => c.name)].join(' ').toLowerCase();
    return inCategory && (!q || haystack.includes(q));
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="max-w-3xl mb-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Search</p>
        <h1 className="font-display font-medium text-4xl text-on-surface mt-2 mb-6">Find your carry</h1>
        <label htmlFor="search-input" className="sr-only">Search products</label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input
            id="search-input"
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try “backpack”, “olive” or “case”"
            className="w-full pl-12 pr-4 py-4 rounded-full bg-surface-container-lowest border border-outline-variant text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={activeCategory === c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                activeCategory === c ? 'bg-on-surface text-surface' : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/50 hover:text-on-surface'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-on-surface-variant mb-6" aria-live="polite">
        {results.length} result{results.length === 1 ? '' : 's'}
        {q ? <> for &ldquo;{query.trim()}&rdquo;</> : ''}
      </p>

      {results.length ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {results.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-on-surface-variant">
          <span className="material-symbols-outlined text-[36px]">search_off</span>
          <p className="mt-2 text-sm">Nothing matches that yet. Try a colour or “backpack”.</p>
        </div>
      )}
    </section>
  );
}
