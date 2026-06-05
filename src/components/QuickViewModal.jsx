import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function QuickViewModal({ product, onClose }) {
  const { addToCart } = useCart()
  if (!product) return null

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <section className="quick-modal" onClick={(event) => event.stopPropagation()}>
        <button className="close-btn" type="button" onClick={onClose} aria-label="Close">×</button>
        <img src={product.image} alt={product.title} />
        <div>
          <p className="eyebrow">{product.category}</p>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <div className="price-row modal-price">
            <strong>${product.price.toFixed(2)}</strong>
            <span>★ {product.rating?.rate || 4.4}</span>
          </div>
          <div className="card-actions">
            <button className="primary-btn" type="button" onClick={() => addToCart(product)}>Add to cart</button>
            <Link className="ghost-btn" to={`/products/${product.id}`} onClick={onClose}>Details</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
