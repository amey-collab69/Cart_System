import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { loginUser } from '../services/api'
import { readStorage, writeStorage } from '../utils/storage'
import { useToast } from './ToastContext'

/* eslint-disable react-refresh/only-export-components */
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const { notify } = useToast()
  const [user, setUser] = useState(() => readStorage('cart_user', null))

  const login = useCallback(async ({ username, password }) => {
    let token
    try {
      const response = await loginUser({ username, password })
      token = response.token
    } catch {
      token = `offline-demo-token-${Date.now()}`
    }

    const nextUser = {
      name: username === 'mor_2314' ? 'Alex Morgan' : username,
      email: `${username.replace(/\s+/g, '.').toLowerCase()}@demo.com`,
      token,
    }
    setUser(nextUser)
    writeStorage('cart_user', nextUser)
    notify('Login successful')
    return nextUser
  }, [notify])

  const register = useCallback((details) => {
    const nextUser = {
      name: details.name,
      email: details.email,
      token: `registered-token-${Date.now()}`,
    }
    setUser(nextUser)
    writeStorage('cart_user', nextUser)
    notify('Account created successfully')
  }, [notify])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('cart_user')
    notify('Logged out')
  }, [notify])

  const value = useMemo(() => ({ user, isAuthenticated: Boolean(user?.token), login, register, logout }), [user, login, register, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
