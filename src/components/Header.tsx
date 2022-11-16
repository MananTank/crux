import { InfoIcon, githubIcon } from '../icons'
import styles from '../styles/Header.module.scss'
import { ThemeSwitcher } from './ThemeSwitcher'

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <h1 className={styles.crux}> CrUX </h1>
      </div>
      <div className={styles.links}>
        <ThemeSwitcher />

        <a
          rel="noreferrer"
          href="https://developer.chrome.com/docs/crux/about/"
          target="_blank"
          aria-label="what is CrUX?"
          title="What is CrUX?"
        >
          {InfoIcon}
        </a>

        <a
          rel="noreferrer"
          href="https://github.com/MananTank/crux"
          target="_blank"
          aria-label="View on Github"
        >
          {githubIcon}
        </a>
      </div>
    </header>
  )
}
