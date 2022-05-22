import {
  Box,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { modifyGridInput, toggleGridVideo, useContent } from 'context/content'
import { GridAction } from 'context/grid-images'
import {
  ChangeEvent,
  Context,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from 'react'

type Action = GridAction

enum Label {
  filename = 'Filename',
  url = 'URL',
}

type InitialState = {
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
  modifyInput: (dispatch: Dispatch<Action>, input: string) => void
  useUnit: () => [InitialState, Dispatch<Action>]
  keyName: string
  inputKey: string
}

interface UnitSwitchProps {
  toggleVideo: (dispatch: Dispatch<Action>, isVideo: boolean) => void
  useUnit: () => [InitialState, Dispatch<Action>]
  keyName: string
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
  keyName,
  inputKey,
}: UnitTextInputProps) {
  const [state, dispatch] = useUnit()
  const input = state[inputKey] as string
  const stateLabel = state.label

  const [, contentDispatch] = useContent()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    modifyInput(dispatch, e.target.value)
  }

  useEffect(() => {
    modifyGridInput(contentDispatch, keyName, input)
  }, [contentDispatch, keyName, id, input])

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

function UnitSwitch({ toggleVideo, useUnit, keyName }: UnitSwitchProps) {
  const [{ input, isVideo }, dispatch] = useUnit()
  const [, contentDispatch] = useContent()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    toggleVideo(dispatch, e.target.checked)
  }

  useEffect(() => {
    if (isVideo !== undefined && input !== undefined) {
      toggleGridVideo(contentDispatch, keyName, isVideo)
      modifyGridInput(contentDispatch, keyName, input)
    }
  }, [contentDispatch, input, isVideo, keyName])

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

export { InputUnit, UnitTitle, UnitTextInput, UnitSwitch, Label }
export type { Action, InitialState }
