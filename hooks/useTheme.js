import { useState, useEffect } from 'react'

const useTheme = () => {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('app-theme')
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      // If no saved theme, use dark as default
      setTheme('dark')
      localStorage.setItem('app-theme', 'dark')
    }
  }, [])

  useEffect(() => {
    // Apply the theme to the document
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('app-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return { theme, toggleTheme, setTheme }
}

export default useTheme
