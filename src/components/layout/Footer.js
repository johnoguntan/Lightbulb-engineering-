'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Lightbulb, ShieldCheck, ArrowRight, Check } from '@phosphor-icons/react';
import styles from './Footer.module.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.topGrid}>
          {/* Brand Info */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brandLogo}>
              <div className={styles.brandIcon}>
                <Lightbulb size={20} weight="fill" color="#FFFFFF" />
              </div>
              <span className={styles.brandTitle}>LIGHTBULB</span>
            </Link>
            <p className={styles.brandDesc}>
              Engineered with you in mind. Bridging industrial precision, tactile everyday carry, and bespoke wholesale manufacturing.
            </p>
            <div className={styles.guaranteeList}>
              <div>✓ 3-Year Warranty on Everyday Carry</div>
              <div>✓ 100% Recyclable B2B Packaging</div>
            </div>
          </div>

          {/* Column 1: Products */}
          <div>
            <h4 className={styles.colTitle}>PRODUCTS</h4>
            <ul className={styles.linkList}>
              <li><Link href="/concept" className={styles.link}>Workplace &amp; Desk</Link></li>
              <li><Link href="/concept" className={styles.link}>Sling Pouches</Link></li>
              <li><Link href="/concept" className={styles.link}>Desk Mats</Link></li>
              <li><Link href="/concept" className={styles.link}>Travel Duffels</Link></li>
              <li><Link href="/packaging" className={styles.link}>Die-Cut Cartons</Link></li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h4 className={styles.colTitle}>SOLUTIONS</h4>
            <ul className={styles.linkList}>
              <li><Link href="/packaging" className={styles.link}>B2B Volume Ordering</Link></li>
              <li><Link href="/packaging/quote" className={styles.link}>Sample Kit Request</Link></li>
              <li><Link href="/packaging" className={styles.link}>Structural Prototyping</Link></li>
              <li><Link href="/packaging" className={styles.link}>Engineering Lab</Link></li>
            </ul>
          </div>

          {/* Column 3: Studio & Dispatch */}
          <div>
            <h4 className={styles.colTitle}>STUDIO</h4>
            <div className={styles.studioDesc}>
              <strong>Lagos Showroom &amp; HQ:</strong><br />
              12 Balogun Street, Ikeja,<br />
              Lagos, Nigeria<br />
              Mon - Fri: 9am - 6pm WAT
            </div>

            <div className={styles.newsletterBox}>
              <div className={styles.newsletterLabel}>ENGINEERING DISPATCH</div>
              {subscribed ? (
                <div style={{ color: '#059669', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <ShieldCheck size={14} weight="fill" /> You&apos;re subscribed!
                </div>
              ) : (
                <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    required
                  />
                  <button type="submit" className="btn btn-primary" style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}>
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div>
            &copy; {new Date().getFullYear()} Lightbulb Engineering Limited. All rights reserved.
          </div>
          <div className={styles.legalLinks}>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Wholesale</Link>
            <Link href="#">Compliance Statement</Link>
            <Link href="#">Trade Enquiries</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
