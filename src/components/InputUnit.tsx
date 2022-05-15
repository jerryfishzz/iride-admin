import {
  Box,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import {
  InputUnitContext,
  modifyInput,
  unitReducer,
  useInputUnit,
} from 'context/input-unit'
import {
  ChangeEvent,
  ReactNode,
  useReducer,
} from 'react'

interface UnitTextInputProps {
  id: string
  label: string
}

const initialState = {
  input: '',
  isVideo: false,
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
  const [{ input }, dispatch] = useInputUnit()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    modifyInput(dispatch, e.target.value)
  }

  return (
    <TextField
      id={id}
      label={label}
      variant="standard"
      fullWidth
      value={input}
      onChange={handleChange}
    />
  )
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
