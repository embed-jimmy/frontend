import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [data, setData] = useState<T>(() => {
    const rawData = localStorage.getItem(key)
    if (rawData === null) {
      return defaultValue
    } else {
      return JSON.parse(rawData)
    }
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data))
  }, [data, key])
  return [data, setData] as const
}
