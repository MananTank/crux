/**
 *
 */

import { useState, useEffect } from 'react'

const prevValues = {} as Record<string, string>

export function useCachedState(
  key: string,
  initValue: string | null,
  defaultValue: string
) {
  const [value, setValue] = useState(() => {
    if (initValue) return initValue
    if (key in prevValues) return prevValues[key]
    const cached = typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null
    return cached || defaultValue
  })

  useEffect(() => {
    prevValues[key] = value
    localStorage.setItem(key, value)
  }, [value])

  return [value, setValue] as const
}
