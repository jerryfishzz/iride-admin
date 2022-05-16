import {
  Box,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import {
  InputUnitContext,
  Label,
  modifyInput,
  toggleVideo,
  unitReducer,
  useInputUnit,
} from 'context/input-unit'
import { ChangeEvent, ReactNode, useReducer } from 'react'

interface UnitTextInputProps {
  id: string
  label?: string
}

const initialState = {
  input: '',
  isVideo: false,
  label: Label.filename,
}

function InputUnit({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(unitReducer, initialState)

  return (
    <InputUnitContext.Provider value={[state, dispatch]}>
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

function UnitTitle({ children }: { children: React.ReactNode }) {
  useInputUnit()
  return <Typography variant="h6">{children}</Typography>
}

function UnitTextInput({ id, label }: UnitTextInputProps) {
  const [{ input, label: stateLabel }, dispatch] = useInputUnit()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    modifyInput(dispatch, e.target.value)
  }

  return (
    <TextField
      id={id}
      label={label ? label : stateLabel}
      variant="standard"
      fullWidth
      value={input}
      onChange={handleChange}
    />
  )
}

function UnitSwitch() {
  const [{ isVideo }, dispatch] = useInputUnit()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    toggleVideo(dispatch, e.target.checked)
  }

  return (
    <Box
      sx={{
        my: 1,
      }}
    >
      <FormControlLabel
        control={
          <Switch
            checked={isVideo}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
        label="Video"
      />
    </Box>
  )
}

export { InputUnit, UnitTitle, UnitTextInput, UnitSwitch }
