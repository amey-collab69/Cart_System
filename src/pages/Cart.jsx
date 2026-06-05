import CartSummary from '../components/CartSummary'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart()

  if (!cart.length) {
    return (
      <div className="empty-state">
        <div className="empty-illustration">CART</div>
        <h1>Your cart is empty</h1>
        <p>Products you add will appear here with quantity controls and totals.</p>
      </div>
    )
  }

  return (
    <section className="split-layout">
      <div className="line-items">
        <h1>Shopping Cart</h1>
        {cart.map((item) => (
          <article className="line-item" key={item.id}>
            <img src={item.image} alt={item.title} />
            <div>
              <strong>{item.title}</strong>
              <small>{item.category}</small>
              <span>${item.price.toFixed(2)}</span>
            </div>
            <div className="quantity-control">
              <button type="button" onClick={() => decreaseQuantity(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button type="button" onClick={() => increaseQuantity(item.id)}>+</button>
            </div>
            <button className="ghost-btn danger" type="button" onClick={() => removeFromCart(item.id)}>Remove</button>
          </article>
        ))}
      </div>
      <CartSummary />
    </section>
  )
}
