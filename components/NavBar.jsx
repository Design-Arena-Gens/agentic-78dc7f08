"use client";
import Link from 'next/link';
import { useCart } from './cart/CartProvider';

export default function NavBar() {
  const { cart } = useCart();
  const count = cart.items.reduce((a, i) => a + i.quantity, 0);
  return (
    <header className="header">
      <div className="header-inner container">
        <div className="brand">
          <Link href="/">Clothing Co.</Link>
        </div>
        <nav className="nav">
          <Link className="link" href="/">Home</Link>
          <Link className="link" href="/cart">Cart ({count})</Link>
        </nav>
      </div>
    </header>
  );
}
