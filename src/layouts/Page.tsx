import { useState, Suspense, useEffect } from 'react'
import { Loader } from '../components/Loader'
import styles from '../styles/Page.module.scss'
import Card from '../components/Card'
import { ClientOnly } from '../components/ClientOnly'
import { useMode } from '../context'
import { useCachedState } from '../hooks/useCachedState'

type Props = { default: string; dataKey: string; initValue: string | null }

export function Page(props: Props) {
  const [input, setInput] = useCachedState(props.dataKey, props.initValue, props.default)
  const mode = useMode()

  useEffect(() => {
    window.history.replaceState({}, '', `?${mode}=${input}`)
  }, [mode, input])

  function handleSubmit(value: string) {
    setInput(value)
    window.history.replaceState({}, '', `?${mode}=${input}`)
  }

  return (
    <>
      <Input onSubmit={handleSubmit} value={input} />
      <ClientOnly fallback={<Loader />}>
        <Suspense fallback={<Loader />}>
          <main>
            <Card formFactor="PHONE" url={input} />
            <Card formFactor="DESKTOP" url={input} />
          </main>
        </Suspense>
      </ClientOnly>
    </>
  )
}

type InputProps = {
  onSubmit: (url: string) => void
  value: string
}

function Input({ onSubmit, value }: InputProps) {
  const [input, setInput] = useState(value)

  // when the value prop changes, update the state
  useEffect(() => {
    if (input === value) return
    setInput(value)
  }, [value])

  return (
    <div className={styles.inputContainer}>
      <input
        aria-label="Enter URL"
        onChange={event => {
          setInput(event.target.value)
        }}
        value={input}
        type="url"
        onKeyDown={event => {
          if (event.key === 'Enter') onSubmit(input)
        }}
      />
      <button type="button" onClick={() => onSubmit(input)}>
        GET CrUX
      </button>
    </div>
  )
}
