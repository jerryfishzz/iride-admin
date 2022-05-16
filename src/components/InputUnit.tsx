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
  unitReducer,
  useInputUnit,
} from 'context/input-unit'
import { ChangeEvent, Dispatch, ReactNode, useReducer } from 'react'

enum ACTION_TYPE {
  TOGGLE_VIDEO = 'TOGGLE_VIDEO',
  MODIFY_INPUT = 'MODIFY_INPUT',
}

type Action =
  | { type: ACTION_TYPE.TOGGLE_VIDEO; isVideo: boolean }
  | { type: ACTION_TYPE.MODIFY_INPUT; input: string }

interface UnitTextInputProps {
  id: string
  label?: string
  modifyInput: (dispatch: Dispatch<Action>, input: string) => void
}

interface UnitSwitchProps {
  toggleVideo: (dispatch: Dispatch<Action>, isVideo: boolean) => void
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

function UnitTitle({ children }: { children: ReactNode }) {
  useInputUnit()
  return <Typography variant="h6">{children}</Typography>
}

function UnitTextInput({ id, label, modifyInput }: UnitTextInputProps) {
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

function UnitSwitch({ toggleVideo }: UnitSwitchProps) {
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

export { InputUnit, UnitTitle, UnitTextInput, UnitSwitch, ACTION_TYPE }
export type { Action }
