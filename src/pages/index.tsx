import { Page } from '../layouts/Page'
import { List } from '../layouts/List'
import { Mode } from '../types'
import { ModeCtx } from '../context'
import { useEffect, useRef, useState } from 'react'
import { ModeSelection } from '../components/ModeSelection'
import { Header } from '../components/Header'
import styles from '../styles/App.module.scss'
import Head from 'next/head'
import { listParam, originParam, urlParam } from '../utils/searchParams'

export default function App() {
  const rendered = useRef(false)
  const [currentMode, setCurrentMode] = useState<Mode>('url')

  // set initial mode
  useEffect(() => {
    if (originParam) {
      setCurrentMode('origin')
    } else if (listParam) {
      setCurrentMode('list')
    }
  }, [])

  useEffect(() => {
    if (!rendered.current) {
      rendered.current = true
      setTimeout(() => {
        document.body.classList.add('hydrated')
      }, 200)
    }
  }, [])

  return (
    <div id="root">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Get CrUX data for any webpage" />
        <title>CrUX</title>
      </Head>
      <ModeCtx.Provider value={[currentMode, setCurrentMode]}>
        <main className={styles.app}>
          <Header />
          <ModeSelection />
          {currentMode === 'list' && <List initValue={listParam} />}
          {currentMode === 'url' && (
            <Page
              key="url"
              initValue={urlParam}
              default={'https://web.dev/vitals/'}
              dataKey="url"
            />
          )}
          {currentMode === 'origin' && (
            <Page
              key="origin"
              initValue={originParam}
              default={'https://web.dev'}
              dataKey="origin"
            />
          )}
        </main>
        <footer className={styles.footer}>
          Created by <a href="https://twitter.com/MananTank_">Manan Tank</a>
        </footer>
      </ModeCtx.Provider>
    </div>
  )
}
