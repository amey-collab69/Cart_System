import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartSummary({ checkout = true }) {
  const { summary } = useCart()
  return (
    <aside className="summary-panel">
      <h2>Order Summary</h2>
      <dl>
        <div><dt>Items</dt><dd>{summary.count}</dd></div>
        <div><dt>Subtotal</dt><dd>${summary.subtotal.toFixed(2)}</dd></div>
        <div><dt>Shipping</dt><dd>{summary.shipping ? `$${summary.shipping.toFixed(2)}` : 'Free'}</dd></div>
        <div className="summary-total"><dt>Total</dt><dd>${summary.total.toFixed(2)}</dd></div>
      </dl>
      {checkout && summary.count > 0 ? <Link className="primary-btn full" to="/checkout">Checkout</Link> : null}
    </aside>
  )
}
