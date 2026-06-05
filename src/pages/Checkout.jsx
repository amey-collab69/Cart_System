import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import CartSummary from '../components/CartSummary'
import { useCart } from '../context/CartContext'

export default function Checkout() {
  const { cart, placeOrder } = useCart()
  const [confirmation, setConfirmation] = useState(null)
  const [shipping, setShipping] = useState({ name: '', address: '', city: '', phone: '' })

  if (!cart.length && !confirmation) return <Navigate to="/cart" replace />

  function handleSubmit(event) {
    event.preventDefault()
    setConfirmation(placeOrder(shipping))
  }

  if (confirmation) {
    return (
      <div className="empty-state success">
        <div className="empty-illustration">OK</div>
        <h1>Order confirmed</h1>
        <p>Your order {confirmation.id} has been placed successfully.</p>
        <Link className="primary-btn" to="/orders">View orders</Link>
      </div>
    )
  }

  return (
    <section className="split-layout">
      <form className="checkout-form" onSubmit={handleSubmit}>
        <h1>Checkout</h1>
        <label>Full name<input value={shipping.name} onChange={(event) => setShipping({ ...shipping, name: event.target.value })} required /></label>
        <label>Address<textarea value={shipping.address} onChange={(event) => setShipping({ ...shipping, address: event.target.value })} required /></label>
        <label>City<input value={shipping.city} onChange={(event) => setShipping({ ...shipping, city: event.target.value })} required /></label>
        <label>Phone<input value={shipping.phone} onChange={(event) => setShipping({ ...shipping, phone: event.target.value })} required /></label>
        <button className="primary-btn full" type="submit">Place order</button>
      </form>
      <CartSummary checkout={false} />
    </section>
  )
}
