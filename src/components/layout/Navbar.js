'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import {
  Lightbulb,
  ShoppingBag,
  MagnifyingGlass,
  User,
  List,
  X,
  CaretDown,
} from '@phosphor-icons/react';
import MobileMenu from './MobileMenu';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const { totalItemCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Announcement Bar matching Stitch Design */}
      <div className="top-announcement">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>🚚</span>
          <span>Free Nationwide Delivery over ₦100,000 | Custom B2B Packaging Available</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', cursor: 'pointer' }}>
          <span>🇳🇬 ₦ NGN (NG)</span>
          <CaretDown size={12} weight="bold" />
        </div>
      </div>

      <header className={`${styles.headerWrapper} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.nav}`}>
          {/* Brand Logo */}
          <Link href="/" className={styles.brand}>
            <div className={styles.brandIcon}>
              <Lightbulb size={20} weight="fill" color="#FFFFFF" />
            </div>
            <div className={styles.brandText}>
              <span className={styles.brandMain}>LIGHTBULB</span>
              <span className={styles.brandSub}>Bags &amp; Packaging</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className={styles.desktopNav}>
            <ul className={styles.links}>
              <li>
                <Link
                  href="/concept"
                  className={`${styles.link} ${pathname === '/concept' ? styles.active : ''}`}
                >
                  Workplace &amp; Desk
                </Link>
              </li>
              <li>
                <Link
                  href="/packaging"
                  className={`${styles.link} ${pathname === '/packaging' ? styles.active : ''}`}
                >
                  Packaging &amp; Boxes
                </Link>
              </li>
              <li>
                <Link
                  href="/packaging/quote"
                  className={`${styles.link} ${pathname.startsWith('/packaging/quote') ? styles.active : ''}`}
                >
                  Custom B2B
                </Link>
              </li>
              <li>
                <Link href="/concept#catalog" className={styles.link}>
                  Stories
                </Link>
              </li>
            </ul>
          </nav>

          {/* Search Bar & Actions */}
          <div className={styles.actions}>
            <div className={styles.searchBox}>
              <MagnifyingGlass size={16} weight="bold" color="var(--text-muted)" />
              <input
                type="text"
                placeholder="Search products, custom packaging..."
                className={styles.searchInput}
              />
              <kbd className={styles.searchKbd}>⌘K</kbd>
            </div>

            <button className={styles.iconBtn} aria-label="User Account">
              <User size={20} weight="bold" />
            </button>

            <button
              className={styles.cartBtn}
              onClick={() => setIsCartOpen(true)}
              aria-label={`Shopping Bag with ${totalItemCount} items`}
            >
              <ShoppingBag size={18} weight="bold" />
              <span>Cart</span>
              <span className={styles.cartBadge}>{totalItemCount}</span>
            </button>

            <button
              className={styles.mobileToggle}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
