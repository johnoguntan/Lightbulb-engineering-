'use client';

import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';

export default function SiteShell({ children }) {
  return (
    <AuthProvider>
    <CartProvider>
      <div className="min-h-screen bg-surface flex flex-col selection:bg-primary selection:text-on-primary">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-full focus:bg-primary focus:text-on-primary"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="w-full flex-1 bg-surface">
          {children}
        </main>
        <CartDrawer />
        <Footer />
      </div>
    </CartProvider>
    </AuthProvider>
  );
}
