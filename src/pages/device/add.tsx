import axios from 'axios'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { DeviceInfo, useDevicesContext } from '../../providers/DevicesProvider'
import { NetpieDataDto } from '../../types/netpie'

export function AddDevicePage() {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm()
  const { addDevice } = useDevicesContext()
  const history = useHistory()
  const onSubmit = useCallback(
    async (device: DeviceInfo) => {
      setLoading(true)
      try {
        const { data } = await axios.get<NetpieDataDto>(
          'https://api.netpie.io/v2/device/shadow/data',
          {
            headers: {
              Authorization: `Device ${device.deviceId}:${device.deviceKey}`,
            },
          }
        )
        if (data.deviceid !== device.deviceId) {
          throw new Error('mismatched device id')
        }
        addDevice(device)
        history.replace(`/device/${device.deviceId}`)
      } catch (e) {
        alert('Failed to connect to device')
        setLoading(false)
      }
    },
    [addDevice, history]
  )
  return (
    <div>
      <h2>Add new device</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Device name:</label>
        <input
          {...register('deviceName', { required: true })}
          disabled={loading}
        />
        <br />
        <label>Device id:</label>
        <input
          {...register('deviceId', { required: true })}
          disabled={loading}
        />
        <br />
        <label>Device key:</label>
        <input
          {...register('deviceKey', { required: true })}
          disabled={loading}
        />
        <br />
        <button disabled={loading}>Add</button>
      </form>
    </div>
  )
}
