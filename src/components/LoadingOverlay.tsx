import { useEffect } from 'react'
import NProgress from 'nprogress'
import { useLoadingContext } from '../providers/LoadingProvider'

import '../nprogress.css'

export function LoadingOverlay() {
  const { loadingCount } = useLoadingContext()
  const isLoading = loadingCount > 0
  useEffect(() => {
    if (!isLoading) return
    const timeout = setTimeout(() => NProgress.start(), 1000)
    return () => {
      clearTimeout(timeout)
      NProgress.done()
    }
  }, [isLoading])
  return null
}
