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
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">People Count</Typography>
        <Typography variant="h3" color="primary">
          {count}
          <CapacityDialog>
            <Typography variant="h5" component="span">
              /{capacity}
            </Typography>
          </CapacityDialog>
        </Typography>
        <PeopleBar variant="determinate" value={(count / capacity) * 100} />
      </CardContent>
    </Card>
  )
}
