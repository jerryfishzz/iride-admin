import {
  Box,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { modifyGridInput, toggleGridVideo, useInputs } from 'context/inputs'
import {
  InputUnitProvider,
  inputUnitReducer,
  modifyInput,
  toggleVideo,
  useInputUnit,
} from 'context/input-unit'
import { ChangeEvent, ReactNode, useEffect, useReducer } from 'react'

enum ACTION_TYPE {
  TOGGLE_VIDEO = 'TOGGLE_VIDEO',
  MODIFY_INPUT = 'MODIFY_INPUT',
}

type Action =
  | { type: ACTION_TYPE.TOGGLE_VIDEO; isVideo: boolean }
  | { type: ACTION_TYPE.MODIFY_INPUT; input: string; key: string }

enum Label {
  filename = 'Filename',
  url = 'URL',
}

type InputUnitType = {
  id: string
  input?: string
  isVideo?: boolean
  label?: Label.filename | Label.url
  [key: string]: string | boolean | (Label.filename | Label.url) | undefined
}

interface InputUnitProps {
  initialState: InputUnitType
  children: ReactNode
}

interface UnitTitleProps {
  children: ReactNode
}

interface UnitTextInputProps {
  id: string
  label?: string
  handler?: string
  inputKey: string
}

interface UnitSwitchProps {
  handler: string
}

function InputUnit({ initialState, children }: InputUnitProps) {
  const [state, dispatch] = useReducer(inputUnitReducer, initialState)

  return (
    <InputUnitProvider value={[state, dispatch]}>
      <Box
        sx={{
          my: 2,
        }}
      >
        {children}
      </Box>
    </InputUnitProvider>
  )
}

function UnitTitle({ children }: UnitTitleProps) {
  useInputUnit('<UnitTitle />')
  return <Typography variant="h6">{children}</Typography>
}

function UnitTextInput({ id, label, handler, inputKey }: UnitTextInputProps) {
  const [state, dispatch] = useInputUnit('<UnitTextInput />')
  const input = state[inputKey] as string
  const stateLabel = state.label

  const [, inputsDispatch] = useInputs()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    modifyInput(dispatch, e.target.value, inputKey)
  }

  useEffect(() => {
    if (handler) {
      modifyGridInput(inputsDispatch, handler, input)
    }
  }, [inputsDispatch, handler, id, input])

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

function UnitSwitch({ handler }: UnitSwitchProps) {
  const [{ input, isVideo }, dispatch] = useInputUnit('<UnitSwitch />')
  const [, inputsDispatch] = useInputs()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    toggleVideo(dispatch, e.target.checked)
  }

  useEffect(() => {
    if (isVideo !== undefined && input !== undefined) {
      toggleGridVideo(inputsDispatch, handler, isVideo)
      modifyGridInput(inputsDispatch, handler, input)
    }
  }, [inputsDispatch, input, isVideo, handler])

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

export { InputUnit, UnitTitle, UnitTextInput, UnitSwitch, Label, ACTION_TYPE }
export type { Action, InputUnitType }
