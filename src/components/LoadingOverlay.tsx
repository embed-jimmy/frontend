import { useEffect } from 'react'
import NProgress from 'nprogress'
import { useLoadingContext } from '../providers/LoadingProvider'

import '../nprogress.css'

export function LoadingOverlay() {
  const { loadingCount } = useLoadingContext()
  const isLoading = loadingCount > 0
  useEffect(() => {
    if (!isLoading) return
    NProgress.start()
    return () => {
      NProgress.done()
    }
  }, [isLoading])
  return null
}
