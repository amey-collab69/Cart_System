import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getCategories, getProducts } from '../services/api'
import { readStorage, writeStorage } from '../utils/storage'

/* eslint-disable react-refresh/only-export-components */
const ProductContext = createContext(null)

const fallbackProducts = [
  { id: 101, title: 'Premium Cotton Jacket', price: 89.99, category: "men's clothing", description: 'Warm cotton jacket with modern utility pockets.', image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg', rating: { rate: 4.7, count: 210 }, createdAt: Date.now() },
  { id: 102, title: 'Minimal Gold Bracelet', price: 49.5, category: 'jewelery', description: 'Clean everyday bracelet with polished finish.', image: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg', rating: { rate: 4.4, count: 95 }, createdAt: Date.now() - 86400000 },
  { id: 103, title: 'Slim Fit Backpack', price: 34.99, category: "men's clothing", description: 'Durable backpack for work, travel, and campus.', image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg', rating: { rate: 4.1, count: 320 }, createdAt: Date.now() - 172800000 },
  { id: 104, title: 'Performance Monitor', price: 399.99, category: 'electronics', description: 'High resolution display for creators and gamers.', image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg', rating: { rate: 4.8, count: 146 }, createdAt: Date.now() - 259200000 },
]

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [recentlyViewed, setRecentlyViewed] = useState(() => readStorage('cart_recent', []))

  useEffect(() => {
    let active = true
    async function load() {
      try {
        const [productData, categoryData] = await Promise.all([getProducts(), getCategories()])
        if (!active) return
        setProducts(productData)
        setCategories(categoryData)
        setError('')
      } catch {
        if (!active) return
        setProducts(fallbackProducts)
        setCategories([...new Set(fallbackProducts.map((product) => product.category))])
        setError('Showing demo products because FakeStore API could not be reached.')
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [])

  useEffect(() => writeStorage('cart_recent', recentlyViewed), [recentlyViewed])

  const addRecentlyViewed = useCallback((product) => {
    setRecentlyViewed((items) => [product, ...items.filter((item) => item.id !== product.id)].slice(0, 6))
  }, [])

  const featured = useMemo(() => products.filter((product) => product.rating?.rate >= 4).slice(0, 4), [products])
  const trending = useMemo(() => [...products].sort((a, b) => (b.rating?.count || 0) - (a.rating?.count || 0)).slice(0, 4), [products])

  const value = useMemo(() => ({
    products,
    categories,
    loading,
    error,
    recentlyViewed,
    addRecentlyViewed,
    featured,
    trending,
  }), [products, categories, loading, error, recentlyViewed, addRecentlyViewed, featured, trending])

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

export function useProducts() {
  return useContext(ProductContext)
}
