import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

export default function ProductCard({ product, onQuickView }) {
  const { addToCart, cart } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()
  const wished = isWishlisted(product.id)
  const inCart = cart.some((item) => item.id === product.id)

  return (
    <article className="product-card">
      <button className={`wish-btn ${wished ? 'active' : ''}`} type="button" onClick={() => toggleWishlist(product)} aria-label="Toggle wishlist">
        {wished ? 'Saved' : 'Save'}
      </button>
      <Link to={`/products/${product.id}`} className="product-image">
        <img src={product.image} alt={product.title} />
      </Link>
      <div className="product-body">
        <p className="eyebrow">{product.category}</p>
        <Link to={`/products/${product.id}`} className="product-title">{product.title}</Link>
        <div className="rating-row">
          <span>Rating {product.rating?.rate || 4.2}</span>
          <small>{product.rating?.count || 80} reviews</small>
        </div>
        <div className="price-row">
          <strong>${product.price.toFixed(2)}</strong>
          <span>Free delivery</span>
        </div>
        <div className="card-actions">
          {inCart ? (
            <Link className="primary-btn added-btn" to="/cart">Added to cart</Link>
          ) : (
            <button className="primary-btn" type="button" onClick={() => addToCart(product)}>Add</button>
          )}
          <button className="ghost-btn" type="button" onClick={() => onQuickView(product)}>Quick view</button>
        </div>
      </div>
    </article>
  )
}
