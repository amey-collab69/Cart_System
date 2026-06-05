import ProductGrid from '../components/ProductGrid'
import { useWishlist } from '../context/WishlistContext'

export default function Wishlist() {
  const { wishlist } = useWishlist()

  return (
    <>
      <section className="page-hero compact">
        <div>
          <p className="eyebrow">Saved Items</p>
          <h1>Wishlist</h1>
          <p>Keep products ready for later and move them to cart when you are ready.</p>
        </div>
      </section>
      {wishlist.length ? (
        <ProductGrid products={wishlist} loading={false} onQuickView={() => {}} />
      ) : (
        <div className="empty-state">
          <div className="empty-illustration">♡</div>
          <h2>Your wishlist is empty</h2>
          <p>Tap the heart on products to save them here.</p>
        </div>
      )}
    </>
  )
}
