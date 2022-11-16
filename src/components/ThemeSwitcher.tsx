import { useState, useEffect } from 'react'
import { sun, moon } from '../icons'
import styles from '../styles/Header.module.scss'

export function ThemeSwitcher() {
  const [isLightTheme, setIsLightTheme] = useState(true)

  // set state initial state
  useEffect(() => {
    if (document.body.dataset.theme === 'dark') {
      setIsLightTheme(false)
    }
  }, [])

  return (
    <button
      aria-label="Switch Theme"
      className={styles.themeSwitcher}
      onClick={() => {
        const nextTheme = isLightTheme ? 'dark' : 'light'
        localStorage.setItem('theme', nextTheme)
        document.body.setAttribute('data-theme', nextTheme)
        setIsLightTheme(!isLightTheme)
      }}
    >
      {isLightTheme ? sun : moon}
    </button>
  )
}
