import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Orders() {
  const { orders } = useCart()

  if (!orders.length) {
    return (
      <div className="empty-state">
        <div className="empty-illustration">#</div>
        <h1>No orders yet</h1>
        <p>Checkout your cart to create your first order.</p>
        <Link className="primary-btn" to="/products">Start shopping</Link>
      </div>
    )
  }

  return (
    <section className="content-section">
      <div className="section-heading"><h1>Orders</h1></div>
      {orders.map((order) => (
        <article className="order-card" key={order.id}>
          <div className="order-row">
            <strong>{order.id}</strong>
            <span>{order.date}</span>
            <b>{order.status}</b>
            <strong>${order.total.toFixed(2)}</strong>
          </div>
          <div className="mini-items">
            {order.items.map((item) => <img key={item.id} src={item.image} alt={item.title} />)}
          </div>
        </article>
      ))}
    </section>
  )
}
