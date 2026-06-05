import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import QuickViewModal from '../components/QuickViewModal'
import { useProducts } from '../context/ProductContext'

export default function Products() {
  const { products, categories, loading, error } = useProducts()
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(() => searchParams.get('category') || 'all')
  const [sort, setSort] = useState('newest')
  const [maxPrice, setMaxPrice] = useState(1000)
  const [quickView, setQuickView] = useState(null)

  const filtered = useMemo(() => {
    const next = products
      .filter((product) => product.title.toLowerCase().includes(search.toLowerCase()))
      .filter((product) => category === 'all' || product.category === category)
      .filter((product) => product.price <= Number(maxPrice))

    return [...next].sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'rating') return (b.rating?.rate || 0) - (a.rating?.rate || 0)
      return (b.createdAt || 0) - (a.createdAt || 0)
    })
  }, [products, search, category, maxPrice, sort])

  return (
    <>
      <section className="page-hero compact">
        <div>
          <p className="eyebrow">Catalog</p>
          <h1>Products</h1>
          <p>Search, filter, sort, preview, and add products to your cart or wishlist.</p>
        </div>
      </section>
      {error ? <p className="notice">{error}</p> : null}
      <section className="filter-bar">
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products" />
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="all">All categories</option>
          {categories.map((item) => <option value={item} key={item}>{item}</option>)}
        </select>
        <select value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="newest">Newest</option>
          <option value="price-asc">Price Low to High</option>
          <option value="price-desc">Price High to Low</option>
          <option value="rating">Rating</option>
        </select>
        <label className="range-control">
          <span>Max ${maxPrice}</span>
          <input type="range" min="10" max="1000" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} />
        </label>
      </section>
      <ProductGrid products={filtered} loading={loading} onQuickView={setQuickView} />
      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </>
  )
}
