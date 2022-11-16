import { useState, useEffect } from 'react'
import { sun, moon } from '../icons'
import styles from '../styles/Header.module.scss'

export function ThemeSwitcher() {
  const [isLightTheme, setIsLightTheme] = useState(true)

  // set state initial state
  useEffect(() => {
    if (document.body.getAttribute('data-theme') === 'dark') {
      setIsLightTheme(false)
    }
  }, [])

  // update theme
  useEffect(() => {
    document.body.setAttribute('data-theme', isLightTheme ? 'light' : 'dark')
  }, [isLightTheme])

  // listen for OS theme changes
  useEffect(() => {
    const colorScheme = window.matchMedia('(prefers-color-scheme: dark)')
    colorScheme.onchange = event => {
      setIsLightTheme(!event.matches)
    }
  }, [])

  return (
    <button
      aria-label="Switch Theme"
      className={styles.themeSwitcher}
      onClick={() => {
        const nextTheme = isLightTheme ? 'dark' : 'light'
        localStorage.setItem('theme', nextTheme)
        setIsLightTheme(!isLightTheme)
      }}
    >
      {isLightTheme ? sun : moon}
    </button>
  )
}
