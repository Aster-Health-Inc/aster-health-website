import { createContext, useContext, useState } from 'react'
import { themes } from './themes'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState('midnight')
  const theme = themes[themeId]
  return (
    <ThemeContext.Provider value={{ theme, themeId, setThemeId }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
