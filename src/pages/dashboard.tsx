import { AirconKnob } from '../components/AirconKnob'
import { ToggleSwitch } from '../components/ToggleSwitch'
import { useDeviceContext } from '../providers/DeviceProvider'

export function DeviceDashboardPage() {
  const {
    device: { data, error },
  } = useDeviceContext()
  if (error) {
    return <span>Error fetching device</span>
  }
  if (!data) {
    return <span>Loading...</span>
  }
  const { count, capacity } = data
  return (
    <div>
      <b>People count: </b>
      {count}/{capacity}
      <br />
      <ToggleSwitch applianceKey="light1" label="Light 1" />
      <ToggleSwitch applianceKey="light2" label="Light 2" />
      <ToggleSwitch applianceKey="light3" label="Light 3" />
      <ToggleSwitch applianceKey="light4" label="Light 4" />
      <ToggleSwitch applianceKey="light5" label="Light 5" />
      <AirconKnob />
    </div>
  )
}
