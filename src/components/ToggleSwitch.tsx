import { useCallback } from 'react'
import { useDeviceContext } from '../providers/DeviceProvider'
import { DeviceStateDto } from '../types/netpie'

type BooleanProps<T> = {
  [K in keyof T as T[K] extends boolean ? K : never]: boolean
}

interface ToggleSwitchProps {
  applianceKey: keyof BooleanProps<DeviceStateDto>
  label: string
}

export function ToggleSwitch({ applianceKey, label }: ToggleSwitchProps) {
  const {
    device: { data },
    updateDevice,
  } = useDeviceContext()
  const currentStatus = data![applianceKey]
  const toggleStatus = useCallback(() => {
    updateDevice((oldData) => {
      return {
        [applianceKey]: !oldData[applianceKey],
      }
    })
  }, [updateDevice, applianceKey])
  return (
    <>
      <b>{label}: </b>
      <button onClick={toggleStatus}>{currentStatus ? 'On' : 'Off'}</button>
      <br />
    </>
  )
}
