import { Route, Switch, useParams } from 'react-router'
import { DeviceProvider } from '../../providers/DeviceProvider'
import { useDeviceInfo } from '../../providers/DevicesProvider'
import { DeviceDashboardPage } from './dashboard'

export function DevicePage() {
  const { deviceId } = useParams<{ deviceId: string }>()
  const device = useDeviceInfo(deviceId)
  if (device === undefined) {
    return <h2>404 Not Found</h2>
  }
  return (
    <DeviceProvider device={device}>
      <h2>{device.deviceName}</h2>
      <Switch>
        <Route exact path="/device/:deviceId" component={DeviceDashboardPage} />
      </Switch>
    </DeviceProvider>
  )
}
