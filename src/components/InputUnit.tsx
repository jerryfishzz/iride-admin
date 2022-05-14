import {
  Box,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { createContext, useContext } from 'react'

const InputUnitContext = createContext<unknown>(undefined)

function InputUnit({ children }: { children: React.ReactNode }) {
  return (
    <InputUnitContext.Provider value={{}}>
      <Box
        sx={{
          my: 2,
        }}
      >
        {children}
      </Box>
    </InputUnitContext.Provider>
  )
}

function useInputUnit() {
  const context = useContext(InputUnitContext)
  if (context === undefined) {
    throw new Error('useToggle must be used within a <Toggle />')
  }
  return context
}

function UnitTitle({ children }: { children: React.ReactNode }) {
  const value = useInputUnit()

  return <Typography variant="h6">{children}</Typography>
}

interface UnitTextInputProps {
  id: string
  label: string
}

function UnitTextInput({ id, label }: UnitTextInputProps) {
  const value = useInputUnit()

  return <TextField id={id} label={label} variant="standard" fullWidth />
}

function UnitSwitch() {
  useInputUnit()

  return (
    <Box
      sx={{
        my: 1,
      }}
    >
      <FormControlLabel control={<Switch />} label="Video" />
    </Box>
  )
}

export { InputUnit, UnitTitle, UnitTextInput, UnitSwitch }
