import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useProducts } from '../context/ProductContext'
import ProductGrid from '../components/ProductGrid'
import QuickViewModal from '../components/QuickViewModal'

export default function Home() {
  const { featured, trending, recentlyViewed, loading, error } = useProducts()
  const [quickView, setQuickView] = useState(null)

  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Summer Sale • Up to 40% off</p>
          <h1>Shop smarter with a fast modern cart experience.</h1>
          <p>Browse top products, save favorites, manage orders, and checkout in a clean React e-commerce dashboard.</p>
          <div className="hero-actions">
            <Link className="primary-btn" to="/products">Shop Products</Link>
            <Link className="ghost-btn" to="/categories">Explore Categories</Link>
          </div>
        </div>
        <div className="deal-panel">
          <span className="discount-badge">Flash Deal</span>
          <strong>Extra 15% off electronics</strong>
          <small>Free shipping over $100</small>
        </div>
      </section>
      {error ? <p className="notice">{error}</p> : null}
      <section className="metrics-band">
        <div><strong>{featured.length || 20}+</strong><span>Featured picks</span></div>
        <div><strong>{trending.length || 12}+</strong><span>Trending products</span></div>
        <div><strong>24h</strong><span>Fast dispatch</span></div>
      </section>
      <section className="content-section">
        <div className="section-heading">
          <h2>Featured Products</h2>
          <Link to="/products">View all</Link>
        </div>
        <ProductGrid products={featured} loading={loading} onQuickView={setQuickView} />
      </section>
      <section className="content-section">
        <div className="section-heading">
          <h2>Trending Now</h2>
          <Link to="/products">Shop trends</Link>
        </div>
        <ProductGrid products={trending} loading={loading} onQuickView={setQuickView} />
      </section>
      {recentlyViewed.length ? (
        <section className="content-section">
          <div className="section-heading">
            <h2>Recently Viewed</h2>
          </div>
          <ProductGrid products={recentlyViewed} loading={false} onQuickView={setQuickView} />
        </section>
      ) : null}
      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </>
  )
}
