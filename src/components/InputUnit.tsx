import {
  Box,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { ChangeEvent, Context, Dispatch, ReactNode, useReducer } from 'react'

enum ACTION_TYPE {
  TOGGLE_VIDEO = 'TOGGLE_VIDEO',
  MODIFY_INPUT = 'MODIFY_INPUT',
}

type Action =
  | { type: ACTION_TYPE.TOGGLE_VIDEO; isVideo: boolean }
  | { type: ACTION_TYPE.MODIFY_INPUT; input: string }

enum Label {
  filename = 'Filename',
  url = 'URL',
}

type InitialState = {
  input?: string
  isVideo?: boolean
  label?: Label.filename | Label.url
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
}

interface UnitSwitchProps {
  toggleVideo: (dispatch: Dispatch<Action>, isVideo: boolean) => void
  useUnit: () => [InitialState, Dispatch<Action>]
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
}: UnitTextInputProps) {
  const [{ input, label: stateLabel }, dispatch] = useUnit()

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

function UnitSwitch({ toggleVideo, useUnit }: UnitSwitchProps) {
  const [{ isVideo }, dispatch] = useUnit()

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

export { InputUnit, UnitTitle, UnitTextInput, UnitSwitch, ACTION_TYPE, Label }
export type { Action, InitialState }
