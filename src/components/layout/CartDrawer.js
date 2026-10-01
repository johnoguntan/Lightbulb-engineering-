'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { X, ShoppingBag, Plus, Minus, Trash, ArrowRight } from '@phosphor-icons/react';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalItemCount, subtotalPrice } = useCart();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <div
        className={`${styles.overlay} ${isCartOpen ? styles.open : ''}`}
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />
      <aside className={`${styles.drawer} ${isCartOpen ? styles.open : ''}`} aria-label="Shopping Cart">
        <header className={styles.header}>
          <div className={styles.title}>
            <ShoppingBag size={22} weight="bold" color="var(--accent)" />
            <span>Your Cart</span>
            <span className={styles.badge}>{totalItemCount}</span>
          </div>
          <button
            className={styles.closeBtn}
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            <X size={20} weight="bold" />
          </button>
        </header>

        <div className={styles.body}>
          {cartItems.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <ShoppingBag size={36} weight="duotone" />
              </div>
              <div className={styles.emptyTitle}>Your cart is empty</div>
              <p>Explore our retail collection or custom packaging options to start shopping.</p>
              <button
                className="btn btn-primary"
                onClick={() => setIsCartOpen(false)}
                style={{ marginTop: '0.5rem' }}
              >
                Start Browsing
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.itemKey} className={styles.cartItem}>
                <Image
                  src={item.image || '/images/products/hero-olive-backpack.jpg'}
                  alt={item.name}
                  width={72}
                  height={72}
                  className={styles.itemImage}
                />
                <div className={styles.itemDetails}>
                  <div>
                    <h4 className={styles.itemName}>{item.name}</h4>
                    <div className={styles.itemMeta}>
                      {item.color && <span>Color: {item.color}</span>}
                      {item.size && <span>• Size: {item.size}</span>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                    <div className={styles.qtyControls}>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.itemKey, -1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} weight="bold" />
                      </button>
                      <span className={styles.qtyVal}>{item.quantity}</span>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.itemKey, 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} weight="bold" />
                      </button>
                    </div>
                    <div className={styles.itemPrice}>{formatCurrency(item.price * item.quantity)}</div>
                  </div>
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(item.itemKey)}
                  aria-label="Remove item"
                  style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}
                >
                  <Trash size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <footer className={styles.footer}>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Subtotal</span>
              <span className={styles.summaryTotal}>{formatCurrency(subtotalPrice)}</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Taxes and shipping calculated at checkout
            </p>
            <Link
              href="/concept/checkout"
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() => setIsCartOpen(false)}
            >
              <span>Proceed to Checkout</span>
              <div className="btn-icon-wrapper">
                <ArrowRight size={14} weight="bold" />
              </div>
            </Link>
          </footer>
        )}
      </aside>
    </>
  );
}
