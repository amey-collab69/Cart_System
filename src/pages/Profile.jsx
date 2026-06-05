import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

export default function Profile() {
  const { user } = useAuth()
  const { summary, orders } = useCart()
  const { wishlist } = useWishlist()

  return (
    <>
      <section className="page-hero compact">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>{user?.name}</h1>
          <p>{user?.email}</p>
        </div>
      </section>
      <section className="dashboard-grid">
        <div className="stat-card"><span>{summary.count}</span><strong>Cart items</strong><Link to="/cart">Manage cart</Link></div>
        <div className="stat-card"><span>{wishlist.length}</span><strong>Wishlist items</strong><Link to="/wishlist">View wishlist</Link></div>
        <div className="stat-card"><span>{orders.length}</span><strong>Orders</strong><Link to="/orders">Order history</Link></div>
      </section>
      <section className="content-section">
        <div className="section-heading"><h2>Recent Orders</h2></div>
        {orders.slice(0, 3).length ? orders.slice(0, 3).map((order) => (
          <article className="order-row" key={order.id}>
            <strong>{order.id}</strong>
            <span>{order.date}</span>
            <span>${order.total.toFixed(2)}</span>
            <b>{order.status}</b>
          </article>
        )) : <p className="muted">No orders yet.</p>}
      </section>
    </>
  )
}
