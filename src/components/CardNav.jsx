import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const links = [
  ['/', 'Home', 'H'],
  ['/products', 'Products', 'P'],
  ['/categories', 'Categories', 'C'],
  ['/cart', 'Cart', 'B'],
  ['/wishlist', 'Wishlist', 'W'],
  ['/orders', 'Orders', 'O'],
  ['/profile', 'Profile', 'U'],
  ['/settings', 'Settings', 'S'],
]

export default function CardNav() {
  const [open, setOpen] = useState(false)
  const { summary } = useCart()
  const { wishlist } = useWishlist()
  const { isAuthenticated, logout } = useAuth()

  return (
    <header className="site-header">
      <div className="brand">
        <span className="brand-mark">VC</span>
        <span>Velocis Cart</span>
      </div>
      <button className="nav-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
        <span />
        <span />
        <span />
      </button>
      <nav className={`card-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
        {links.map(([to, label, icon]) => (
          <NavLink to={to} key={to} onClick={() => setOpen(false)} className={({ isActive }) => `nav-card ${isActive ? 'active' : ''}`}>
            <span className="nav-icon">{icon}</span>
            <span>{label}</span>
            {to === '/cart' && summary.count > 0 ? <b>{summary.count}</b> : null}
            {to === '/wishlist' && wishlist.length > 0 ? <b>{wishlist.length}</b> : null}
          </NavLink>
        ))}
      </nav>
      <div className="header-actions">
        {isAuthenticated ? (
          <button className="ghost-btn" type="button" onClick={logout}>Logout</button>
        ) : (
          <NavLink className="primary-btn" to="/login">Login</NavLink>
        )}
      </div>
    </header>
  )
}
