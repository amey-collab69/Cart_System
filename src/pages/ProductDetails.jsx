import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import ProductGrid from '../components/ProductGrid'

export default function ProductDetails() {
  const { id } = useParams()
  const { products, addRecentlyViewed } = useProducts()
  const { addToCart, cart } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()
  const product = products.find((item) => String(item.id) === id)
  const [activeImage, setActiveImage] = useState('')
  const inCart = product ? cart.some((item) => item.id === product.id) : false

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product)
    }
  }, [product, addRecentlyViewed])

  const related = useMemo(() => products.filter((item) => item.category === product?.category && item.id !== product?.id).slice(0, 4), [products, product])

  if (!product) {
    return (
      <div className="empty-state">
        <div className="empty-illustration">?</div>
        <h1>Product not found</h1>
        <Link className="primary-btn" to="/products">Back to products</Link>
      </div>
    )
  }

  return (
    <>
      <section className="details-layout">
        <div className="gallery-panel">
          <img className="detail-image" src={(product.gallery || []).includes(activeImage) ? activeImage : product.image} alt={product.title} />
          <div className="thumb-row">
            {(product.gallery || [product.image]).map((image, index) => (
              <button type="button" key={`${image}-${index}`} onClick={() => setActiveImage(image)}>
                <img src={image} alt={`${product.title} view ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>
        <div className="detail-copy">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.title}</h1>
          <div className="rating-row large"><span>Rating {product.rating?.rate || 4.2}</span><small>{product.rating?.count || 120} ratings</small></div>
          <p>{product.description}</p>
          <strong className="detail-price">${product.price.toFixed(2)}</strong>
          <div className="hero-actions">
            {inCart ? (
              <Link className="primary-btn" to="/cart">Added to cart</Link>
            ) : (
              <button className="primary-btn" type="button" onClick={() => addToCart(product)}>Add to cart</button>
            )}
            <button className="ghost-btn" type="button" onClick={() => toggleWishlist(product)}>
              {isWishlisted(product.id) ? 'Remove wishlist' : 'Save wishlist'}
            </button>
          </div>
        </div>
      </section>
      <section className="content-section">
        <div className="section-heading"><h2>Related Products</h2></div>
        <ProductGrid products={related} loading={false} onQuickView={() => {}} />
      </section>
    </>
  )
}
