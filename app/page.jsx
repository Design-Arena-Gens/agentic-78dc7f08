import NavBar from '@/components/NavBar';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';
import { CartProvider } from '@/components/cart/CartProvider';

export default function HomePage() {
  return (
    <CartProvider>
      <NavBar />
      <main>
        <section className="hero">
          <div className="container">
            <h1>Modern apparel for everyday life</h1>
            <p>Quality basics, timeless fits, and elevated materials. Free shipping over $75.</p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="grid">
              {products.map(p => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="footer container">? {new Date().getFullYear()} Clothing Co.</footer>
    </CartProvider>
  );
}
