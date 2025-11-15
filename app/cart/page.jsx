"use client";
import NavBar from '@/components/NavBar';
import { CartProvider, useCart } from '@/components/cart/CartProvider';

function CartTable() {
  const { cart, update, remove, clear } = useCart();
  const subtotal = cart.items.reduce((a, i) => a + i.product.price * i.quantity, 0);
  return (
    <div className="container section">
      <h1 style={{ marginTop: 0 }}>Your cart</h1>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: '45%' }}>Item</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map(({ product, quantity }) => (
                <tr key={product.slug}>
                  <td>{product.name}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => update(product.slug, Math.max(1, Number(e.target.value)))}
                    />
                  </td>
                  <td>${(product.price * quantity).toFixed(2)}</td>
                  <td>
                    <button className="button secondary" onClick={() => remove(product.slug)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} style={{ textAlign: 'right' }}>Subtotal</td>
                <td colSpan={2}>${subtotal.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
          <div style={{ display: 'flex', gap: 12, marginTop: 16, justifyContent: 'flex-end' }}>
            <button className="button secondary" onClick={clear}>Clear cart</button>
            <button className="button" onClick={() => { alert('Order placed! Thank you for shopping.'); clear(); }}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default function CartPage() {
  return (
    <CartProvider>
      <NavBar />
      <CartTable />
    </CartProvider>
  );
}
