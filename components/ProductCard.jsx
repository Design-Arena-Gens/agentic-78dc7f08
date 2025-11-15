import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <div className="card-media">
        <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
      </div>
      <div className="card-body">
        <div className="card-title">{product.name}</div>
        <div className="card-sub">{product.category}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
          <span className="price">${product.price.toFixed(2)}</span>
          <Link className="button secondary" href={`/product/${product.slug}`}>View</Link>
        </div>
      </div>
    </div>
  );
}
