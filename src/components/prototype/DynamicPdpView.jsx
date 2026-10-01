'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Photo from './Photo';
import ProductCard from './ProductCard';
import { PRODUCTS } from '@/data/products';
import { useCart, formatNaira } from '@/context/CartContext';

export default function DynamicPdpView({ product }) {
  const { addItem } = useCart();
  const params = useSearchParams();
  const initial = product.colours.find((c) => c.id === params?.get('colour')) || product.colours[0];

  const [colour, setColour] = useState(initial);
  const [monogram, setMonogram] = useState('');
  const [quantity, setQuantity] = useState(1);

  const pickColour = (c) => {
    setColour(c);
    const url = new URL(window.location.href);
    url.searchParams.set('colour', c.id);
    window.history.replaceState(null, '', url);
  };

  const [lead, ...others] = colour.images;
  const related = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-on-surface-variant font-medium mb-6">
          <Link href="/catalog" className="hover:text-primary transition-colors">Bags &amp; Carry</Link>
          <span aria-hidden="true">/</span>
          <span>{product.categoryLabel}</span>
          <span aria-hidden="true">/</span>
          <span className="text-on-surface font-semibold" aria-current="page">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Gallery: big lead image, then the rest in a 2-up grid (Bellroy-style scroll gallery). */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-3">
            <div className="relative col-span-2 aspect-[4/5] rounded-3xl overflow-hidden bg-surface-container">
              <Photo key={lead} src={lead} alt={`${product.name} in ${colour.name}`} priority sizes="(min-width:1024px) 58vw, 100vw" />
              {product.tag && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-surface/90 backdrop-blur text-primary font-bold text-[11px] uppercase tracking-wider shadow-sm">
                  {product.tag}
                </span>
              )}
            </div>
            {others.map((src, i) => (
              <div key={src} className={`relative rounded-3xl overflow-hidden bg-surface-container ${others.length === 1 ? 'col-span-2 aspect-[4/3]' : 'aspect-[4/5]'}`}>
                <Photo src={src} alt={`${product.name} in ${colour.name}, view ${i + 2}`} sizes="(min-width:1024px) 29vw, 50vw" />
              </div>
            ))}
          </div>

          {/* Buy box */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col gap-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/60 shadow-sm space-y-6">
              <div>
                <p className="text-xs font-semibold text-on-surface-variant">{product.categoryLabel}</p>
                <h1 className="font-display font-medium text-3xl sm:text-4xl text-on-surface mt-1 leading-tight">{product.name}</h1>
                <p className={`font-display mt-2 ${product.purchasable ? 'text-2xl font-bold text-on-surface' : 'text-base font-semibold text-on-surface-variant'}`}>
                  {product.formattedPrice}
                </p>
              </div>

              <p className="text-sm text-on-surface-variant leading-relaxed">{product.longDescription || product.description}</p>

              <div>
                <p className="text-xs font-bold text-on-surface uppercase tracking-wider mb-3">
                  Colour: <span className="text-primary normal-case tracking-normal font-semibold">{colour.name}</span>
                </p>
                <div className="flex flex-wrap gap-3" role="radiogroup" aria-label="Colour">
                  {product.colours.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      role="radio"
                      aria-checked={c.id === colour.id}
                      aria-label={c.name}
                      title={c.name}
                      onClick={() => pickColour(c)}
                      className={`w-9 h-9 rounded-full border border-black/10 transition-all ${
                        c.id === colour.id ? 'ring-2 ring-offset-2 ring-primary ring-offset-surface-container-lowest' : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>

              {product.purchasable ? (
                <>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="monogram" className="text-xs font-bold text-on-surface uppercase tracking-wider">
                        Monogram (optional)
                      </label>
                      <span className="text-[10px] text-on-surface-variant">Up to 6 characters</span>
                    </div>
                    <input
                      id="monogram"
                      type="text"
                      maxLength={6}
                      value={monogram}
                      onChange={(e) => setMonogram(e.target.value)}
                      placeholder="e.g. T.A."
                      className="w-full px-4 py-3 rounded-2xl bg-surface-container-low border border-outline-variant text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary uppercase tracking-widest"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-outline-variant rounded-full bg-surface-container-low px-1">
                      <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-10 h-11 text-on-surface-variant hover:text-on-surface font-bold">
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-bold" aria-live="polite">{quantity}</span>
                      <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((q) => q + 1)} className="w-10 h-11 text-on-surface-variant hover:text-on-surface font-bold">
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        addItem(product, { material: colour.name, monogram, quantity });
                        setQuantity(1);
                      }}
                      className="flex-1 py-3.5 rounded-full bg-primary text-on-primary font-display font-bold text-sm shadow-md hover:bg-primary-container transition-colors inline-flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                      Add to cart · {formatNaira(product.price * quantity)}
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/60 text-sm text-on-surface-variant flex gap-3">
                  <span className="material-symbols-outlined text-primary">schedule</span>
                  <span>
                    Online ordering for this bag opens soon. For bulk or custom orders,{' '}
                    <Link href="/b2b#quote" className="text-primary font-semibold hover:underline">request a quote</Link>.
                  </span>
                </div>
              )}

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-on-surface-variant">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px] text-primary">local_shipping</span>Free delivery over ₦50,000</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[18px] text-primary">storefront</span>Pickup from Ifako-Gbagada</li>
              </ul>
            </div>

            {Object.keys(product.specs || {}).length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/60">
                <h2 className="font-display font-bold text-lg text-on-surface mb-4">Specifications</h2>
                <dl className="grid grid-cols-2 gap-5 text-sm">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[10px] uppercase tracking-wider font-semibold text-on-surface-variant">{k.replace(/([A-Z])/g, ' $1')}</dt>
                      <dd className="font-semibold text-on-surface mt-0.5">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="bg-surface-container-low border-t border-outline-variant/40 py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display font-medium text-2xl sm:text-3xl text-on-surface mb-8">Pairs well with</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
