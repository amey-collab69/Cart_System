import ProductCard from './ProductCard'
import SkeletonGrid from './SkeletonGrid'

export default function ProductGrid({ products, loading, onQuickView }) {
  if (loading) return <SkeletonGrid />

  if (!products.length) {
    return (
      <div className="empty-state">
        <div className="empty-illustration">0</div>
        <h2>No products found</h2>
        <p>Try another search, category, price range, or sorting option.</p>
      </div>
    )
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
      ))}
    </div>
  )
}
