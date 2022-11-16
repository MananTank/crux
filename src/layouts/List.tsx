import { Suspense, useEffect, useState } from 'react'
import { Loader } from '../components/Loader'
import styles from '../styles/List.module.scss'
import Card from '../components/Card'
import { ClientOnly } from '../components/ClientOnly'
import { useCachedState } from '../hooks/useCachedState'
import { useMode } from '../context'

type TextAreaProps = {
  value: string
  onEnter: (value: string) => void
}

export function TextAreaContainer({ value, onEnter }: TextAreaProps) {
  const [input, setInput] = useState(value)
  return (
    <div className={styles.inputContainer}>
      <textarea
        value={input.replace(/,/g, '\n')}
        onChange={e => {
          setInput(e.target.value.replace(/\n/g, ','))
        }}
      ></textarea>
      <button type="button" onClick={() => onEnter(input)}>
        GET CrUX
      </button>
    </div>
  )
}

export function CompactList({ urls }: { urls: string[] }) {
  return (
    <main>
      {urls.map((url: string, i: number) => {
        return (
          <Suspense fallback={<Loader />} key={url}>
            <div className={styles.compactList} key={url + i}>
              <h2 className={styles.url}> {url}</h2>
              <div>
                <Card formFactor="PHONE" url={url} />
                <hr className={styles.line} />
                <Card formFactor="DESKTOP" url={url} />
              </div>
            </div>
          </Suspense>
        )
      })}
    </main>
  )
}

const defaultURLList = `https://web.dev/lcp/,https://web.dev/fid/,https://web.dev/cls/`

export function List({ initValue }: { initValue: string | null }) {
  const [input, setInput] = useCachedState('list', initValue, defaultURLList)
  const mode = useMode()

  useEffect(() => {
    window.history.replaceState({}, '', `?${mode}=${input}`)
  }, [mode, input])

  const urls = input
    .split(',')
    .map(v => v.trim())
    .filter(s => s !== '')

  return (
    <>
      <TextAreaContainer
        onEnter={value => {
          setInput(value)
        }}
        value={input}
      />
      <ClientOnly fallback={<Loader />}>
        <CompactList urls={urls} />
      </ClientOnly>
    </>
  )
}
