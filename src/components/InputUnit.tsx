import {
  Box,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { modifyGridInput, toggleGridVideo, useContent } from 'context/content'
import {
  ChangeEvent,
  Context,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from 'react'

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

type InitialState = {
  id: string
  input?: string
  isVideo?: boolean
  label?: Label.filename | Label.url
  [key: string]: string | boolean | (Label.filename | Label.url) | undefined
}

interface InputUnitProps {
  UnitContext: Context<[InitialState, Dispatch<Action>] | undefined>
  reducer: (state: InitialState, action: Action) => InitialState
  initialState: InitialState
  children: ReactNode
}

interface UnitTitleProps {
  useUnit: () => [InitialState, Dispatch<Action>]
  children: ReactNode
}

interface UnitTextInputProps {
  id: string
  label?: string
  modifyInput: (dispatch: Dispatch<Action>, input: string, key: string) => void
  useUnit: () => [InitialState, Dispatch<Action>]
  objKey?: string
  inputKey: string
}

interface UnitSwitchProps {
  toggleVideo: (dispatch: Dispatch<Action>, isVideo: boolean) => void
  useUnit: () => [InitialState, Dispatch<Action>]
  objKey: string
}

function InputUnit({
  UnitContext,
  reducer,
  initialState,
  children,
}: InputUnitProps) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UnitContext.Provider value={[state, dispatch]}>
      <Box
        sx={{
          my: 2,
        }}
      >
        {children}
      </Box>
    </UnitContext.Provider>
  )
}

function UnitTitle({ useUnit, children }: UnitTitleProps) {
  useUnit()
  return <Typography variant="h6">{children}</Typography>
}

function UnitTextInput({
  id,
  label,
  modifyInput,
  useUnit,
  objKey,
  inputKey,
}: UnitTextInputProps) {
  const [state, dispatch] = useUnit()
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

function UnitSwitch({ toggleVideo, useUnit, objKey }: UnitSwitchProps) {
  const [{ input, isVideo }, dispatch] = useUnit()
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
export type { Action, InitialState }
