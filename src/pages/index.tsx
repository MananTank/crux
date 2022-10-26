import { Page } from '../layouts/Page'
import { List } from '../layouts/List'
import { Mode } from '../types'
import { ModeCtx } from '../context'
import { useEffect, useRef, useState } from 'react'
import { ModeSelection } from '../components/ModeSelection'
import { Header } from '../components/Header'
import styles from '../styles/App.module.scss'
import Head from 'next/head'

const defaultURL = 'https://web.dev/vitals/'
const defaultOrigin = 'https://web.dev'
const defaultURLList = `https://web.dev/lcp/,https://web.dev/fid/,https://web.dev/cls/`

const savedValues = {
  url: defaultURL,
  origin: defaultOrigin,
  list: defaultURLList
}

export default function App() {
  const [mode, _setMode] = useState<Mode>('url')
  const [input, _setInput] = useState(defaultURL)
  const modeUpdated = useRef(false)

  function setInput(value: string) {
    _setInput(value)
  }

  useEffect(() => {
    savedValues[mode] = input
  }, [mode, input])

  function setMode(value: Mode) {
    console.log('set mode', value)
    _setMode(value as Mode)
    if (value === 'url') setInput(savedValues.url)
    if (value === 'origin') setInput(savedValues.origin)
    if (value === 'list') {
      setInput(savedValues.list)
    }
  }

  useEffect(() => {
    if (!modeUpdated.current) return
    window.history.replaceState({}, '', `?${mode}=${input}`)
  }, [mode, input])

  useEffect(() => {
    modeUpdated.current = true
    const url = new URL(window.location.href)

    if (url.searchParams.get('origin')) {
      setMode('origin')
      setInput(url.searchParams.get('origin'))
    } else if (url.searchParams.get('list')) {
      setMode('list')
      setInput(url.searchParams.get('list'))
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      document.body.classList.add('hydrated')
    }, 200)
  })

  return (
    <div id="root">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Get CrUX data for any webpage" />
        <title>CrUX</title>
      </Head>
      <ModeCtx.Provider value={[mode, setMode]}>
        <main className={styles.app}>
          <Header />
          <ModeSelection />
          {mode === 'list' && <List input={input} setInput={setInput} />}
          {mode === 'url' && (
            <Page key="url" input={input} setInput={setInput} mode={mode} />
          )}
          {mode === 'origin' && (
            <Page key="origin" input={input} setInput={setInput} mode={mode} />
          )}
        </main>
        <footer className={styles.footer}>
          Copyright © 2022 <a href="https://twitter.com/MananTank_">Manan Tank</a>
        </footer>
      </ModeCtx.Provider>
    </div>
  )
}
