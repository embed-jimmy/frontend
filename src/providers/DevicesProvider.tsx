import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import { useLocalStorage } from '../utils'

export interface DeviceInfo {
  deviceName: string
  deviceId: string
  deviceKey: string
}

interface IDevicesProvider {
  devices: DeviceInfo[]
  addDevice: (device: DeviceInfo) => void
  removeDevice: (device: DeviceInfo) => void
}

const DevicesContext = createContext<IDevicesProvider>(
  null as unknown as IDevicesProvider
)

export function DevicesProvider({ children }: PropsWithChildren<{}>) {
  const [devices, setDevices] = useLocalStorage<DeviceInfo[]>('devices', [])
  const addDevice = useCallback(
    (newDevice: DeviceInfo) => {
      if (!devices.some((device) => device.deviceId === newDevice.deviceId)) {
        setDevices([...devices, newDevice])
      } else {
        setDevices(
          devices.map((device) => {
            if (device.deviceId !== newDevice.deviceId) return device
            return newDevice
          })
        )
      }
    },
    [devices, setDevices]
  )
  const removeDevice = useCallback(
    (toRemove: DeviceInfo) => {
      setDevices((devices) =>
        devices.filter((device) => device.deviceId !== toRemove.deviceId)
      )
    },
    [setDevices]
  )
  return (
    <DevicesContext.Provider value={{ devices, addDevice, removeDevice }}>
      {children}
    </DevicesContext.Provider>
  )
}

export function useDevicesContext() {
  return useContext(DevicesContext)
}

export function useDeviceInfo(deviceId: string) {
  const { devices } = useDevicesContext()
  const device = useMemo(() => {
    return devices.find((device) => device.deviceId === deviceId)
  }, [devices, deviceId])
  return device
}
