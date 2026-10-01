'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'lightbulb_cart_v2';
export const FREE_SHIPPING_THRESHOLD = 50000;
export const COURIER_FEE = 3500;

const CartContext = createContext(null);

function lineKey({ slug, material, monogram }) {
  return [slug, material || '', (monogram || '').toUpperCase()].join('|');
}

export function formatNaira(amount) {
  return `₦${Number(amount || 0).toLocaleString('en-NG')}`;
}

// Tiny external store so the bag survives navigation, reloads and stays in
// sync across tabs, without a setState-in-effect hydration dance.
const EMPTY = [];
let cache = null;
const listeners = new Set();

function readStorage() {
  if (cache) return cache;
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
    cache = Array.isArray(parsed) ? parsed : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function writeStorage(next) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable — the bag just won't persist */
  }
  listeners.forEach((l) => l());
}

function subscribe(listener) {
  listeners.add(listener);
  const onStorage = (e) => {
    if (e.key === STORAGE_KEY) {
      cache = null;
      listener();
    }
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

const noopSubscribe = () => () => {};

export function CartProvider({ children }) {
  const items = useSyncExternalStore(subscribe, readStorage, () => EMPTY);
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const setItems = useCallback((updater) => writeStorage(updater(readStorage())), []);

  // Lock page scroll while the drawer is open, close on Escape.
  useEffect(() => {
    if (!isCartOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setIsCartOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [isCartOpen]);

  /**
   * Add a product to the bag.
   * @param {object} product  entry from PRODUCTS
   * @param {object} options  { material?: string, monogram?: string, quantity?: number, open?: boolean }
   */
  const addItem = useCallback((product, options = {}) => {
    const material = options.material || product.materials?.[0]?.name || 'Standard';
    const monogram = (options.monogram || '').trim().toUpperCase();
    const quantity = Math.max(1, Number(options.quantity) || 1);
    const key = lineKey({ slug: product.slug, material, monogram });

    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [
        ...prev,
        {
          key,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || null,
          category: product.category,
          material,
          monogram,
          quantity,
        },
      ];
    });
    if (options.open !== false) setIsCartOpen(true);
  }, [setItems]);

  const updateQuantity = useCallback((key, quantity) => {
    setItems((prev) =>
      quantity <= 0 ? prev.filter((i) => i.key !== key) : prev.map((i) => (i.key === key ? { ...i, quantity } : i))
    );
  }, [setItems]);

  const removeItem = useCallback((key) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, [setItems]);

  const clearCart = useCallback(() => setItems(() => []), [setItems]);

  const value = useMemo(() => {
    const count = items.reduce((acc, i) => acc + i.quantity, 0);
    const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
    const courierFee = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : COURIER_FEE;
    return {
      items,
      count,
      subtotal,
      courierFee,
      hydrated,
      isCartOpen,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    };
  }, [items, hydrated, isCartOpen, addItem, updateQuantity, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
