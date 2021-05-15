import { Redirect } from 'react-router-dom'
import { useDevicesContext } from '../providers/DevicesProvider'

export function RedirectFirstDevicePage() {
  const { devices } = useDevicesContext()
  if (devices.length === 0) {
    return <Redirect to="/device/add" />
  }
  return <Redirect to={`/device/${devices[0].deviceId}`} />
}
