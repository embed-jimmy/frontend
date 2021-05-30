import {
  Box,
  Button,
  Card,
  CardContent,
  Fab,
  Typography,
} from '@material-ui/core'
import styled from '@emotion/styled'
import { useCallback } from 'react'
import { useDeviceContext } from '../providers/DeviceProvider'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'

const RoundButton = styled(Button)`
  height: 36px;
  border-radius: 18px;
`

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
  const toggle = useCallback(() => {
    updateDevice(({ airconOn }) => ({ airconOn: !airconOn }))
  }, [updateDevice])
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Air-Conditioner</Typography>
        <Box marginY={1}>
          <Typography variant="h3" color="primary" align="center">
            {airconOn ? <>{airconTemp}&deg;C</> : 'Off'}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <RoundButton
            variant="outlined"
            onClick={offsetTempBy(-1)}
            disabled={!airconOn}
          >
            -
          </RoundButton>
          <Box display="inline-block" paddingX={2}>
            <Fab onClick={toggle} color="primary" size="medium">
              <PowerSettingsNewIcon />
            </Fab>
          </Box>
          <RoundButton
            variant="outlined"
            onClick={offsetTempBy(+1)}
            disabled={!airconOn}
          >
            +
          </RoundButton>
        </Box>
      </CardContent>
    </Card>
  )
}
