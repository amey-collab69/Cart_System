import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { readStorage, writeStorage } from '../utils/storage'
import { useToast } from './ToastContext'

/* eslint-disable react-refresh/only-export-components */
const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const { notify } = useToast()
  const [wishlist, setWishlist] = useState(() => readStorage('cart_wishlist', []))

  useEffect(() => writeStorage('cart_wishlist', wishlist), [wishlist])

  const toggleWishlist = useCallback((product) => {
    setWishlist((items) => {
      const exists = items.some((item) => item.id === product.id)
      notify(exists ? 'Product removed from wishlist' : 'Product added to wishlist')
      return exists ? items.filter((item) => item.id !== product.id) : [...items, product]
    })
  }, [notify])

  const removeWishlist = useCallback((id) => {
    setWishlist((items) => items.filter((item) => item.id !== id))
    notify('Product removed from wishlist')
  }, [notify])

  const isWishlisted = useCallback((id) => wishlist.some((item) => item.id === id), [wishlist])

  const value = useMemo(() => ({ wishlist, toggleWishlist, removeWishlist, isWishlisted }), [wishlist, toggleWishlist, removeWishlist, isWishlisted])

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  return useContext(WishlistContext)
}
