import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'

const ThemeContext = createContext({
  theme: 'dark',
  isLight: false,
  isDark: true,
  toggleTheme: () => {},
  setTheme: () => {},
})

export const THEME_STORAGE_KEY = 'hackatopia_theme'

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme
      }
    } catch (e) {
      console.warn('Unable to access localStorage for theme preference', e)
    }
    return 'dark' // default theme
  })

  // Set specific theme safely with localStorage sync
  const setTheme = useCallback((newTheme) => {
    const validTheme = newTheme === 'light' ? 'light' : 'dark'
    setThemeState(validTheme)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, validTheme)
    } catch (e) {
      console.warn('Unable to save theme preference to localStorage', e)
    }
  }, [])

  // Atomic toggle using functional state update to prevent stale closures and missed rapid clicks
  const toggleTheme = useCallback(() => {
    setThemeState((prevTheme) => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
      } catch (e) {
        console.warn('Unable to save theme preference to localStorage', e)
      }
      return nextTheme
    })
  }, [])

  // Synchronize DOM attributes and classList immediately
  useEffect(() => {
    const root = document.documentElement
    const body = document.body

    root.setAttribute('data-theme', theme)
    body.setAttribute('data-theme', theme)

    if (theme === 'light') {
      root.classList.add('light-theme')
      root.classList.remove('dark-theme')
      body.classList.add('light-theme')
      body.classList.remove('dark-theme')
    } else {
      root.classList.add('dark-theme')
      root.classList.remove('light-theme')
      body.classList.add('dark-theme')
      body.classList.remove('light-theme')
    }
  }, [theme])

  const contextValue = useMemo(() => ({
    theme,
    isLight: theme === 'light',
    isDark: theme === 'dark',
    toggleTheme,
    setTheme
  }), [theme, toggleTheme, setTheme])

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

