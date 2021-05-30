import { Box } from '@material-ui/core'
import { AirconKnob } from '../components/AirconKnob'
import { Loading } from '../components/Loading'
import { PeopleCount } from '../components/PeopleCount'
import { ToggleSwitch } from '../components/ToggleSwitch'
import { useDeviceContext } from '../providers/DeviceProvider'

function LightSwitches() {
  return (
    <Box>
      <ToggleSwitch applianceKey="light1" label="Light 1" />
      <ToggleSwitch applianceKey="light2" label="Light 2" />
      <ToggleSwitch applianceKey="light3" label="Light 3" />
      <ToggleSwitch applianceKey="light4" label="Light 4" />
      <ToggleSwitch applianceKey="light5" label="Light 5" />
    </Box>
  )
}

export function DeviceDashboardPage() {
  const {
    device: { data, error },
  } = useDeviceContext()
  if (error) {
    return <span>Error fetching device</span>
  }
  if (!data) {
    return <Loading />
  }
  return (
    <div>
      <h2>Classroom</h2>
      <PeopleCount />
      <Box
        display={{ xs: 'none', sm: 'grid' }}
        gridTemplateColumns="repeat(12, 1fr)"
        gap={2}
        marginTop={2}
      >
        <Box gridColumn="auto / span 6">
          <AirconKnob />
        </Box>
        <Box gridColumn="auto / span 6">
          <LightSwitches />
        </Box>
      </Box>
      <Box display={{ xs: 'block', sm: 'none' }} marginTop={2}>
        <LightSwitches />
        <AirconKnob />
      </Box>
    </div>
  )
}
