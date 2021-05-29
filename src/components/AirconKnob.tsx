import { useDeviceContext } from '../providers/DeviceProvider'
import { ToggleSwitch } from './ToggleSwitch'

export function AirconKnob() {
  const {
    device: { data },
    updateDevice,
  } = useDeviceContext()
  const { airconOn, airconTemp } = data!
  const offsetTempBy = (offset: number) => {
    return () => {
      updateDevice(({ airconTemp }) => ({ airconTemp: airconTemp + offset }))
    }
  }
  return (
    <>
      <ToggleSwitch applianceKey="airconOn" label="A/C" />
      {airconOn ? (
        <>
          <button onClick={offsetTempBy(-1)}>-</button>
          {airconTemp}
          <button onClick={offsetTempBy(+1)}>+</button>
          <br />
        </>
      ) : null}
    </>
  )
}
