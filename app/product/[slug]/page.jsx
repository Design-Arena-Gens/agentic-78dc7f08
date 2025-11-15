import Image from 'next/image';
import NavBar from '@/components/NavBar';
import { getProduct, products } from '@/lib/products';
import { CartProvider, useCart } from '@/components/cart/CartProvider';
import Link from 'next/link';

function ProductClient({ product }) {
  const { add } = useCart();
  return (
    <div className="container section">
      <div className="product">
        <div className="product-media">
          <Image src={product.image} alt={product.name} fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
        </div>
        <div>
          <h1 className="product-title">{product.name}</h1>
          <div style={{ margin: '6px 0 12px', color: 'var(--muted)' }}>{product.category}</div>
          <div className="price" style={{ fontSize: 22 }}>${product.price.toFixed(2)}</div>
          <p className="product-desc">{product.description}</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 14 }}>
            <button className="button" onClick={() => add(product, 1)}>Add to cart</button>
            <Link className="button secondary" href="/cart">Go to cart</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductPage({ params }) {
  const product = getProduct(params.slug);
  if (!product) return <div className="container section">Product not found.</div>;
  return (
    <CartProvider>
      <NavBar />
      <ProductClient product={product} />
    </CartProvider>
  );
}

export async function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }));
}
