'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Package, ArrowRight } from '@phosphor-icons/react';
import styles from './MobileMenu.module.css';

export default function MobileMenu({ isOpen, onClose }) {
  return (
    <div className={`${styles.menuOverlay} ${isOpen ? styles.open : ''}`}>
      <div className={styles.navGroup}>
        <Link href="/" className={styles.navLink} onClick={onClose}>
          <span>Home</span>
          <ArrowRight size={20} color="var(--text-muted)" />
        </Link>

        <Link href="/concept" className={styles.navLink} onClick={onClose}>
          <div>
            <div style={{ fontSize: '1.25rem' }}>Lightbulb Concept</div>
            <span className={`${styles.divisionBadge} ${styles.conceptBadge}`} style={{ marginTop: '0.375rem' }}>
              <ShoppingBag size={14} weight="bold" /> B2C Retail Bags
            </span>
          </div>
          <ArrowRight size={20} color="var(--accent)" />
        </Link>

        <Link href="/packaging" className={styles.navLink} onClick={onClose}>
          <div>
            <div style={{ fontSize: '1.25rem' }}>Lightbulb Packaging</div>
            <span className={`${styles.divisionBadge} ${styles.packagingBadge}`} style={{ marginTop: '0.375rem' }}>
              <Package size={14} weight="bold" /> Custom Wholesale (Min 100)
            </span>
          </div>
          <ArrowRight size={20} color="#0369A1" />
        </Link>

        <Link href="/concept#categories" className={styles.navLink} onClick={onClose}>
          <span>Bag Categories</span>
          <ArrowRight size={20} color="var(--text-muted)" />
        </Link>
      </div>

      <div className={styles.ctaSection}>
        <Link href="/packaging/quote" className="btn btn-primary" onClick={onClose} style={{ width: '100%' }}>
          <span>Request Custom Quote</span>
          <div className="btn-icon-wrapper">
            <ArrowRight size={14} weight="bold" />
          </div>
        </Link>
      </div>
    </div>
  );
}
