import { Link } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'

export default function Categories() {
  const { categories, products } = useProducts()

  return (
    <>
      <section className="page-hero compact">
        <div>
          <p className="eyebrow">Browse</p>
          <h1>Categories</h1>
          <p>Explore product collections across fashion, electronics, and accessories.</p>
        </div>
      </section>
      <div className="category-grid">
        {categories.map((category) => {
          const count = products.filter((product) => product.category === category).length
          return (
            <Link className="category-tile" to={`/products?category=${category}`} key={category}>
              <span>{category.charAt(0).toUpperCase()}</span>
              <strong>{category}</strong>
              <small>{count} products</small>
            </Link>
          )
        })}
      </div>
    </>
  )
}
