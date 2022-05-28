import {
  Box,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { modifyGridInput, toggleGridVideo, useContent } from 'context/content'
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
  objKey?: string
  inputKey: string
}

interface UnitSwitchProps {
  objKey: string
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

function UnitTextInput({ id, label, objKey, inputKey }: UnitTextInputProps) {
  const [state, dispatch] = useInputUnit('<UnitTextInput />')
  const input = state[inputKey] as string
  const stateLabel = state.label

  const [, contentDispatch] = useContent()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    modifyInput(dispatch, e.target.value, inputKey)
  }

  useEffect(() => {
    if (objKey) {
      modifyGridInput(contentDispatch, objKey, input)
    }
  }, [contentDispatch, objKey, id, input])

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

function UnitSwitch({ objKey }: UnitSwitchProps) {
  const [{ input, isVideo }, dispatch] = useInputUnit('<UnitSwitch />')
  const [, contentDispatch] = useContent()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    toggleVideo(dispatch, e.target.checked)
  }

  useEffect(() => {
    if (isVideo !== undefined && input !== undefined) {
      toggleGridVideo(contentDispatch, objKey, isVideo)
      modifyGridInput(contentDispatch, objKey, input)
    }
  }, [contentDispatch, input, isVideo, objKey])

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
