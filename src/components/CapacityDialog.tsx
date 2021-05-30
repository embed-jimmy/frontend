import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core'
import {
  ChangeEvent,
  cloneElement,
  FormEvent,
  ReactElement,
  useCallback,
  useState,
} from 'react'
import { useDeviceContext } from '../providers/DeviceProvider'

export function CapacityDialog({ children }: { children: ReactElement }) {
  const [open, setOpen] = useState(false)
  const [newCapacity, setNewCapacity] = useState<string | null>(null)
  const {
    device: { data },
    updateDevice,
  } = useDeviceContext()
  const { capacity } = data!
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (newValue.match(/^(?:\d+|)$/)) {
      setNewCapacity(newValue)
    }
  }, [])
  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])
  const handleClose = useCallback(() => {
    setOpen(false)
    setNewCapacity(null)
  }, [])
  const handleSave = (e: FormEvent) => {
    e.preventDefault()
    if (newCapacity !== null) {
      updateDevice(() => ({ capacity: parseInt(newCapacity) }))
    }
    handleClose()
  }

  return (
    <>
      {cloneElement(children, {
        onClick: handleOpen,
        style: { cursor: 'pointer' },
      })}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit</DialogTitle>
        <form onSubmit={handleSave}>
          <DialogContent style={{ paddingTop: 0 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Room capacity"
              fullWidth
              variant="standard"
              value={newCapacity ?? capacity}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
