import useSWR from 'swr'
import { NetpieDataDto } from '../../types/netpie'

export function DeviceDashboardPage() {
  const { data, error } = useSWR<NetpieDataDto>('/data')
  if (error) {
    return <span>Error fetching device</span>
  }
  if (!data) {
    return <span>Loading...</span>
  }
  const { count, capacity, light, aircon } = data!.data
  return (
    <div>
      <b>People count: </b>
      {count}/{capacity}
      <br />
      <b>Lights: </b>
      {}
      {light ? 'On' : 'Off'}
      <br />
      <b>Climate control: </b>
      Mode {aircon}
    </div>
  )
}
