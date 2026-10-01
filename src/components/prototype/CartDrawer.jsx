'use client';

import Link from 'next/link';
import ImageWithFallback from './ImageWithFallback';
import { useCart, formatNaira, FREE_SHIPPING_THRESHOLD } from '@/context/CartContext';

export default function CartDrawer() {
  const { items, count, subtotal, courierFee, isCartOpen, closeCart, updateQuantity, removeItem } = useCart();

  const grandTotal = subtotal + courierFee;
  const remainingForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const isEmpty = items.length === 0;

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Workspace bag"
        aria-hidden={!isCartOpen}
        inert={!isCartOpen}
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-surface shadow-2xl border-l border-outline-variant flex flex-col transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">shopping_bag</span>
            <h2 className="font-display text-lg text-on-surface font-bold uppercase">Workspace Bag</h2>
            <span className="px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-xs font-bold">
              {count} item{count === 1 ? '' : 's'}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant"
            aria-label="Close bag"
            type="button"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {isEmpty ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-4">
            <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px] text-on-surface-variant">shopping_bag</span>
            </div>
            <div>
              <p className="font-display font-bold text-lg text-on-surface">Your bag is empty</p>
              <p className="text-sm text-on-surface-variant mt-1">Add a workspace instrument to get started.</p>
            </div>
            <Link
              href="/catalog"
              onClick={closeCart}
              className="px-6 py-3 rounded-full bg-primary text-on-primary font-display text-sm font-bold hover:bg-primary-container transition-colors"
            >
              Browse the store
            </Link>
          </div>
        ) : (
          <>
            <div className="p-5 bg-surface-container-lowest border border-outline-variant/60 rounded-2xl mx-4 my-4 shadow-sm">
              <div className="flex justify-between items-center text-xs font-semibold mb-2 gap-2">
                <span className="text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-primary">local_shipping</span>
                  Lagos courier
                </span>
                <span className="text-primary font-bold text-right">
                  {remainingForFree === 0 ? 'Free delivery unlocked' : `Add ${formatNaira(remainingForFree)} for free delivery`}
                </span>
              </div>
              <div
                className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progressPercent)}
                aria-label="Progress to free delivery"
              >
                <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>

            <ul className="flex-1 overflow-y-auto px-4 space-y-3 pb-4">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4 p-4 rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-sm">
                  <Link
                    href={`/catalog/${item.slug}`}
                    onClick={closeCart}
                    className="w-20 h-20 shrink-0 rounded-2xl overflow-hidden bg-surface-container-high"
                  >
                    <ImageWithFallback src={item.image} alt={item.name} category={item.category} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <Link
                        href={`/catalog/${item.slug}`}
                        onClick={closeCart}
                        className="font-display text-sm text-on-surface font-bold hover:text-primary leading-snug"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.key)}
                        className="text-on-surface-variant hover:text-error transition-colors"
                        aria-label={`Remove ${item.name}`}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-1">Finish: {item.material}</p>
                    {item.monogram && <p className="text-xs text-on-surface-variant">Monogram: {item.monogram}</p>}
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center border border-outline-variant rounded-full px-1 py-0.5 bg-surface-container-low">
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          className="w-7 h-7 text-on-surface-variant hover:bg-surface-container rounded-full"
                          aria-label={`Decrease quantity of ${item.name}`}
                          type="button"
                        >
                          −
                        </button>
                        <span className="px-2 text-xs font-bold text-on-surface min-w-[1.5rem] text-center" aria-live="polite">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          className="w-7 h-7 text-on-surface-variant hover:bg-surface-container rounded-full"
                          aria-label={`Increase quantity of ${item.name}`}
                          type="button"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-display text-sm font-bold text-on-surface">{formatNaira(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="p-6 border-t border-outline-variant bg-surface-container-low space-y-4 rounded-t-3xl shadow-inner">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Items subtotal</span>
                  <span className="text-on-surface font-semibold">{formatNaira(subtotal)}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Lagos courier</span>
                  <span className="text-primary font-bold">{courierFee === 0 ? 'FREE' : formatNaira(courierFee)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-on-surface pt-2 border-t border-outline-variant/60">
                  <span>Estimated total</span>
                  <span className="text-primary text-base">{formatNaira(grandTotal)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full py-4 bg-primary text-on-primary rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary-container transition-all shadow-md hover:shadow-lg"
              >
                <span>PROCEED TO CHECKOUT</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
