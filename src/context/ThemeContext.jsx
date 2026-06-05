import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { readStorage, writeStorage } from '../utils/storage'

/* eslint-disable react-refresh/only-export-components */
const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => readStorage('cart_theme', 'light'))

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    writeStorage('cart_theme', theme)
  }, [theme])

  const value = useMemo(() => ({
    theme,
    toggleTheme: () => setTheme((current) => (current === 'light' ? 'dark' : 'light')),
    setTheme,
  }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
