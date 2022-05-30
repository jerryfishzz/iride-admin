import {
  Box,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import {
  FeaturSlide,
  modifyFeatureInput,
  modifyGridInput,
  toggleGridVideo,
  useInputs,
} from 'context/inputs'
import { InputUnitProvider, useInputUnit } from 'context/input-unit-new'
import { ChangeEvent, ReactNode, useEffect, useReducer, useState } from 'react'
import {
  capitalizedWord,
  getInputUnitState,
  GroupName,
  splidId,
} from 'utils/helper'

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

function InputUnit({ children }: InputUnitProps) {
  return (
    <InputUnitProvider value={{}}>
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

function UnitTextInput({ id }: UnitTextInputProps) {
  const [state, dispatch] = useInputs('<UnitTextInput />')
  const [label, setLabel] = useState<string>('')

  const [groupName, order, inputKey] = splidId(id)

  const { inputUnitState, input } = getInputUnitState?.(
    state,
    groupName as GroupName,
    order,
    inputKey
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (groupName === GroupName.grid)
      modifyGridInput(dispatch, groupName + order, e.target.value)

    if (groupName === GroupName.feature)
      modifyFeatureInput(dispatch, e.target.value, inputKey, (inputUnitState as FeaturSlide).id)
  }

  useEffect(() => {
    if (groupName === GroupName.grid) {
      inputUnitState?.isVideo ? setLabel(Label.url) : setLabel(Label.filename)
    } else {
      setLabel(capitalizedWord(inputKey))
    }
  }, [groupName, inputKey, inputUnitState?.isVideo])

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
