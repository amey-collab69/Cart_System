import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()
  const wished = isWishlisted(product.id)

  return (
    <article className="product-card">
      <button className={`wish-btn ${wished ? 'active' : ''}`} type="button" onClick={() => toggleWishlist(product)} aria-label="Toggle wishlist">
        {wished ? '♥' : '♡'}
      </button>
      <Link to={`/products/${product.id}`} className="product-image">
        <img src={product.image} alt={product.title} />
      </Link>
      <div className="product-body">
        <p className="eyebrow">{product.category}</p>
        <Link to={`/products/${product.id}`} className="product-title">{product.title}</Link>
        <div className="rating-row">
          <span>★ {product.rating?.rate || 4.2}</span>
          <small>{product.rating?.count || 80} reviews</small>
        </div>
        <div className="price-row">
          <strong>${product.price.toFixed(2)}</strong>
          <span>Free delivery</span>
        </div>
        <div className="card-actions">
          <button className="primary-btn" type="button" onClick={() => addToCart(product)}>Add</button>
          <button className="ghost-btn" type="button" onClick={() => onQuickView(product)}>Quick view</button>
        </div>
      </div>
    </article>
  )
}
