"use client";
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'storefront_cart_v1';

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [] });

  // Load from localStorage on client
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCart(JSON.parse(raw));
    } catch {}
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const api = useMemo(() => ({
    cart,
    add(product, quantity = 1) {
      setCart(prev => {
        const idx = prev.items.findIndex(i => i.product.slug === product.slug);
        const items = [...prev.items];
        if (idx >= 0) items[idx] = { ...items[idx], quantity: items[idx].quantity + quantity };
        else items.push({ product, quantity });
        return { items };
      });
    },
    remove(slug) {
      setCart(prev => ({ items: prev.items.filter(i => i.product.slug !== slug) }));
    },
    update(slug, quantity) {
      setCart(prev => ({ items: prev.items.map(i => i.product.slug === slug ? { ...i, quantity } : i) }));
    },
    clear() { setCart({ items: [] }); }
  }), [cart]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
