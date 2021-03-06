import {
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from '@material-ui/core'
import styled from '@emotion/styled'
import { useDeviceContext } from '../providers/DeviceProvider'
import { CapacityDialog } from './CapacityDialog'

const PeopleBar = styled(LinearProgress)`
  height: 16px;
  border-radius: 8px;

  span {
    border-radius: 8px;
  }
`

export function PeopleCount() {
  const {
    device: { data },
  } = useDeviceContext()
  const { count, capacity } = data!
  const exceededMax = count > capacity
  const percentage = exceededMax ? 100 : (count / capacity) * 100
  const color = exceededMax ? 'secondary' : 'primary'
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">People Count</Typography>
        <Typography variant="h3" color={color}>
          {count}
          <CapacityDialog>
            <Typography variant="h5" component="span">
              /{capacity}
            </Typography>
          </CapacityDialog>
        </Typography>
        <PeopleBar variant="determinate" value={percentage} color={color} />
      </CardContent>
    </Card>
  )
}
