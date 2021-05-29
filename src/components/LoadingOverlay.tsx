import { useDeviceContext } from '../providers/DeviceProvider'

export function LoadingOverlay() {
  const { loading } = useDeviceContext()
  console.log(loading)
  if (loading) {
    return <div style={{ position: 'fixed', top: 0, left: 0 }}>Loading...</div>
  } else {
    return null
  }
}
