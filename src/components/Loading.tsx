import { useEffect } from 'react'
import { useLoadingContext } from '../providers/LoadingProvider'

export function Loading() {
  const { setLoadingCount } = useLoadingContext()
  useEffect(() => {
    setLoadingCount((loadingCount) => loadingCount + 1)
    return () => setLoadingCount((loadingCount) => loadingCount - 1)
  })
  return null
}
