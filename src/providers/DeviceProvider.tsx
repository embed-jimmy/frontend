import axios from 'axios'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import useSWR, { SWRConfig, SWRResponse } from 'swr'
import { DeviceStateDto } from '../types/netpie'
import { io } from 'socket.io-client'
import { Loading } from '../components/Loading'

export type UpdateData = Partial<DeviceStateDto>
export type UpdateCallback = (data: DeviceStateDto) => UpdateData

interface IDevice {
  device: SWRResponse<DeviceStateDto, any>
  updateDevice: (callback: UpdateCallback) => void
}

const DeviceContext = createContext<IDevice>(null as unknown as IDevice)

type DeviceProviderProps = PropsWithChildren<{}>

const apiUrl = process.env.REACT_APP_API_URL as string

export function DeviceProvider({ children }: DeviceProviderProps) {
  const [loading, setLoading] = useState(false)
  const client = useMemo(() => {
    return axios.create({
      baseURL: apiUrl,
    })
  }, [])
  const fetcher = useCallback(
    async <T,>(key: string) => {
      const response = await client.get<T>(key)
      return response.data
    },
    [client]
  )
  const swrResponse = useSWR<DeviceStateDto>('/', { fetcher })
  const { mutate } = swrResponse
  const updateDevice = useCallback(
    async (callback: UpdateCallback) => {
      mutate((data) => {
        if (typeof data === 'undefined') return
        setLoading(true)
        const newData = { ...callback(data), changeId: new Date().getTime() }
        client.put('/updateDevice', newData)
        return { ...data, ...newData } as DeviceStateDto
      }, false)
    },
    [client, mutate]
  )
  useEffect(() => {
    const socket = io(apiUrl, { transports: ['polling'] })
    socket.on('message', (_, rawData) => {
      const data = rawData as DeviceStateDto
      mutate((oldData) => {
        if (
          oldData &&
          data.changeId !== 0 &&
          data.changeId < oldData.changeId
        ) {
          return oldData
        }
        setLoading(false)
        return data
      }, false)
    })
    return () => {
      socket.disconnect()
    }
  }, [mutate])
  return (
    <DeviceContext.Provider value={{ device: swrResponse, updateDevice }}>
      {loading ? <Loading /> : null}
      <SWRConfig value={{ fetcher }}>{children}</SWRConfig>
    </DeviceContext.Provider>
  )
}

export function useDeviceContext() {
  return useContext(DeviceContext)
}
