import { Box, Button, Card, CardContent, Typography } from '@material-ui/core'
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
    <Card style={{ marginBottom: 16 }}>
      <CardContent style={{ paddingBottom: 16 }}>
        <Box display="flex" alignItems="center">
          <Typography variant="h6">{label}</Typography>
          <Box flex={1} />
          <Button
            onClick={toggleStatus}
            variant={currentStatus ? 'contained' : 'text'}
          >
            {currentStatus ? 'On' : 'Off'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}
