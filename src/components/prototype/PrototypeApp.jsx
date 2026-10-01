'use client';

import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import HomeView from './HomeView';
import CatalogView from './CatalogView';
import CompareView from './CompareView';
import SearchView from './SearchView';
import B2bView from './B2bView';
import CraftView from './CraftView';
import CheckoutView from './CheckoutView';
import TrackingView from './TrackingView';

export default function PrototypeApp({ initialRoute = 'home' }) {
  const [activeRoute, setActiveRoute] = useState(initialRoute);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Modular Lapdesk Pro M4', price: 38500, quantity: 1, material: 'Moso Bamboo / Slate' },
    { id: '2', name: 'Structured Field Messenger', price: 45000, quantity: 1, material: '1000D Cordura Nylon' },
  ]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleNavigate = (targetRoute) => {
    setActiveRoute(targetRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const handleAddToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        return prev.map((i) => (i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { id: String(Date.now()), quantity: 1, ...item }];
    });
    openCart();
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col selection:bg-primary selection:text-on-primary">
      {/* Navbar */}
      <Header
        activeRoute={activeRoute}
        onNavigate={handleNavigate}
        openCart={openCart}
        cartCount={cartCount}
      />

      {/* Dedicated Page Route View */}
      <main className="w-full flex-1 bg-surface">
        {activeRoute === 'home' && <HomeView openCart={openCart} onAddToCart={handleAddToCart} />}
        {activeRoute === 'catalog' && <CatalogView openCart={openCart} onAddToCart={handleAddToCart} />}
        {activeRoute === 'b2b' && <B2bView openCart={openCart} />}
        {activeRoute === 'compare' && <CompareView openCart={openCart} />}
        {activeRoute === 'search' && <SearchView openCart={openCart} />}
        {activeRoute === 'craft' && <CraftView />}
        {activeRoute === 'checkout' && <CheckoutView activeRoute={activeRoute} onNavigate={handleNavigate} />}
        {activeRoute === 'tracking' && <TrackingView activeRoute={activeRoute} />}
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isCartOpen={isCartOpen}
        closeCart={closeCart}
        onNavigate={handleNavigate}
        cartItems={cartItems}
        cartSubtotal={cartSubtotal}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
