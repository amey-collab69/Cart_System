import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { readStorage, writeStorage } from '../utils/storage'
import { useToast } from './ToastContext'

/* eslint-disable react-refresh/only-export-components */
const CartContext = createContext(null)

export function CartProvider({ children }) {
  const { notify } = useToast()
  const [cart, setCart] = useState(() => readStorage('cart_items', []))
  const [orders, setOrders] = useState(() => readStorage('cart_orders', []))

  useEffect(() => writeStorage('cart_items', cart), [cart])
  useEffect(() => writeStorage('cart_orders', orders), [orders])

  const addToCart = useCallback((product) => {
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id)
      if (existing) {
        return items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...items, { ...product, quantity: 1 }]
    })
    notify('Product added to cart')
  }, [notify])

  const removeFromCart = useCallback((id) => {
    setCart((items) => items.filter((item) => item.id !== id))
    notify('Product removed from cart')
  }, [notify])

  const increaseQuantity = useCallback((id) => {
    setCart((items) => items.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
  }, [])

  const decreaseQuantity = useCallback((id) => {
    setCart((items) => items
      .map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const placeOrder = useCallback((shipping) => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      items: cart,
      shipping,
      total: subtotal + (subtotal > 100 ? 0 : 8),
      status: 'Confirmed',
    }
    setOrders((items) => [order, ...items])
    clearCart()
    notify('Order placed successfully')
    return order
  }, [cart, clearCart, notify])

  const summary = useMemo(() => {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = subtotal > 100 || subtotal === 0 ? 0 : 8
    return { count, subtotal, shipping, total: subtotal + shipping }
  }, [cart])

  const value = useMemo(() => ({
    cart,
    orders,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    placeOrder,
    summary,
  }), [cart, orders, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, placeOrder, summary])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  return useContext(CartContext)
}
