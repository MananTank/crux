import { useState, Suspense } from 'react'
import { Loader } from '../components/Loader'
import { Mode } from '../types'
import styles from '../styles/Page.module.scss'
import Card from '../components/Card'
import { ClientOnly } from '../components/ClientOnly'

export function Page(props: {
  input: string
  mode: Mode
  setInput: (value: string) => void
}) {
  return (
    <>
      <Input onSubmit={props.setInput} value={props.input} />
      <ClientOnly fallback={<Loader />}>
        <Suspense fallback={<Loader />}>
          <main>
            <Card formFactor="PHONE" url={props.input} />
            <Card formFactor="DESKTOP" url={props.input} />
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
