'use client';

import { useState } from 'react';
import Link from 'next/link';
import Photo from './Photo';
import { useCart } from '@/context/CartContext';

/**
 * Bellroy-style product card: studio shot by default, lifestyle shot on hover,
 * colour swatches swap the photos.
 */
export default function ProductCard({ product, sizes = '(min-width:1024px) 25vw, 50vw', priority = false }) {
  const { addItem } = useCart();
  const [colour, setColour] = useState(product.colours[0]);
  const [primary, secondary] = colour.images;
  const href = `/catalog/${product.slug}?colour=${colour.id}`;

  return (
    <article className="group flex flex-col bg-surface-container-lowest rounded-2xl sm:rounded-3xl border border-outline-variant/50 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <Link href={href} className="relative block aspect-[4/5] bg-surface-container-low overflow-hidden" aria-label={`${product.name}, ${colour.name}`}>
        <Photo src={primary} alt={`${product.name} in ${colour.name}`} sizes={sizes} priority={priority} className="transition-transform duration-700 group-hover:scale-[1.03]" />
        {secondary && (
          <Photo
            src={secondary}
            alt=""
            sizes={sizes}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}
        {product.tag && (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 sm:px-3 py-1 rounded-full bg-primary text-on-primary text-[10px] font-bold uppercase tracking-wider shadow-sm">
            {product.tag}
          </span>
        )}
      </Link>

      <div className="flex flex-col flex-1 p-3 sm:p-5 gap-2 sm:gap-3">
        <div>
          <p className="text-[11px] font-semibold text-on-surface-variant">{product.categoryLabel}</p>
          <h3 className="font-display font-bold text-sm sm:text-lg text-on-surface leading-snug">
            <Link href={href} className="hover:text-primary transition-colors">
              {product.name}
            </Link>
          </h3>
          <p className="hidden sm:block text-xs text-on-surface-variant mt-1 line-clamp-2">{product.description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2" role="radiogroup" aria-label={`${product.name} colour`}>
          {product.colours.map((c) => (
            <button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={c.id === colour.id}
              aria-label={c.name}
              title={c.name}
              onClick={() => setColour(c)}
              onMouseEnter={() => setColour(c)}
              className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-black/10 transition-all ${
                c.id === colour.id ? 'ring-2 ring-offset-2 ring-primary ring-offset-surface-container-lowest' : 'hover:scale-110'
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
          {product.colours.length <= 5 && <span className="hidden sm:inline text-[11px] text-on-surface-variant ml-1">{colour.name}</span>}
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-1 sm:pt-2">
          <div>
            <p className="text-[10px] text-on-surface-variant">Retail price</p>
            <p className={`font-display font-bold ${product.purchasable ? 'text-base sm:text-lg text-on-surface' : 'text-xs sm:text-sm text-on-surface-variant'}`}>
              {product.formattedPrice}
            </p>
          </div>
          {product.purchasable ? (
            <button
              type="button"
              onClick={() => addItem(product, { material: colour.name })}
              className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md hover:bg-primary-container transition-colors"
              aria-label={`Add ${product.name} in ${colour.name} to bag`}
            >
              <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
            </button>
          ) : (
            <Link
              href={href}
              className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors"
              aria-label={`View ${product.name}`}
            >
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
