'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { NAV as NAV_LINKS, ANNOUNCEMENT } from '@/content/site';

function isActive(pathname, href) {
  const path = href.split('#')[0];
  if (href.includes('#')) return false;
  return pathname === path || pathname.startsWith(`${path}/`);
}

export default function Header() {
  const pathname = usePathname() || '/';
  const { count, hydrated, openCart } = useCart();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-b border-outline-variant/50">
      {/* Top bar: division switch + announcement */}
      <div className="w-full bg-surface-container-high text-on-surface-variant px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between gap-4 text-[11px] font-medium">
        <div className="hidden sm:flex items-center gap-1 p-0.5 rounded-full bg-surface-container">
          <Link href="/" className={`px-3 py-1 rounded-full ${pathname.startsWith('/b2b') ? 'hover:text-on-surface' : 'bg-surface-container-lowest text-primary shadow-sm font-semibold'}`}>
            Lightbulb Concepts
          </Link>
          <Link href="/b2b" className={`px-3 py-1 rounded-full ${pathname.startsWith('/b2b') ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold' : 'hover:text-on-surface'}`}>
            Lightbulb Packaging
          </Link>
        </div>
        <p className="flex-1 sm:flex-none text-center flex items-center justify-center gap-1.5">
          <span className="material-symbols-outlined text-[14px] text-primary">local_shipping</span>
          <span className="sm:hidden">Free delivery over ₦50,000</span>
          <span className="hidden sm:inline">{ANNOUNCEMENT}</span>
        </p>
        <span className="hidden md:inline-flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">language</span>
          NGN (₦)
        </span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 group text-left focus:outline-none" aria-label="Lightbulb Engineering home">
          <div className="w-10 h-10 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-md group-hover:bg-primary-container transition-all">
            <span className="material-symbols-outlined text-[22px]">lightbulb</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl tracking-tight text-on-surface group-hover:text-primary transition-colors">
              LIGHTBULB
            </span>
            <span className="hidden sm:block font-sans text-[10px] tracking-widest text-on-surface-variant uppercase font-semibold">
              Engineering &amp; Co.
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(pathname, link.href) ? 'page' : undefined}
              className={`px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive(pathname, link.href)
                  ? 'text-primary bg-primary/5'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            className="p-2.5 xl:pl-4 xl:pr-16 rounded-full xl:bg-surface-container-high hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-2 text-sm"
            aria-label="Search the catalogue"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
            <span className="hidden xl:inline">Search catalogue…</span>
          </Link>

          <Link
            href={user ? '/account' : '/account/sign-in'}
            className="hidden sm:flex p-2.5 rounded-full hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors items-center"
            aria-label={user ? 'Your account' : 'Sign in'}
          >
            <span className="material-symbols-outlined text-[22px]">{user ? 'account_circle' : 'person'}</span>
          </Link>

          <button
            onClick={openCart}
            className="relative px-4 py-2 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface transition-all flex items-center gap-2 text-xs font-bold shadow-sm"
            aria-label={`Open bag, ${count} item${count === 1 ? '' : 's'}`}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px] text-primary">shopping_bag</span>
            <span className="hidden sm:inline">Cart</span>
            <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary text-[10px] font-bold min-w-[1.5rem] text-center">
              {hydrated ? count : '·'}
            </span>
          </button>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden p-2.5 rounded-full hover:bg-surface-container-high text-on-surface"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <nav
        id="mobile-nav"
        aria-label="Mobile"
        className={`lg:hidden border-t border-outline-variant/50 bg-surface ${menuOpen ? 'block' : 'hidden'}`}
      >
        <ul className="px-4 py-3 flex flex-col">
          {[{ href: '/', label: 'Home' }, ...NAV_LINKS, { href: '/search', label: 'Search' }, { href: user ? '/account' : '/account/sign-in', label: user ? 'Your account' : 'Sign in' }].map((link) => {
            const active = link.href === '/' ? pathname === '/' : isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-semibold ${
                    active ? 'bg-primary/10 text-primary' : 'text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  {link.label}
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">chevron_right</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
