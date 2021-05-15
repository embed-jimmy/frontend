import axios from 'axios'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import { SWRConfig } from 'swr'
import { DeviceInfo } from './DevicesProvider'

interface IDevice {
  info: DeviceInfo
}

const DeviceContext = createContext<IDevice>(null as unknown as IDevice)

type DeviceProviderProps = PropsWithChildren<{
  device: DeviceInfo
}>

export function DeviceProvider({ device, children }: DeviceProviderProps) {
  const apiKey = `Device ${device.deviceId}:${device.deviceKey}`
  const client = useMemo(() => {
    return axios.create({
      baseURL: 'https://api.netpie.io/v2/device/shadow',
      headers: {
        Authorization: apiKey,
      },
    })
  }, [apiKey])
  const fetcher = useCallback(
    async <T,>(key: string) => {
      const response = await client.get<T>(key)
      return response.data
    },
    [client]
  )
  return (
    <DeviceContext.Provider value={{ info: device }}>
      <SWRConfig value={{ fetcher }}>{children}</SWRConfig>
    </DeviceContext.Provider>
  )
}

export function useDeviceContext() {
  return useContext(DeviceContext)
}
