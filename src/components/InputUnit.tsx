import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import {
  deleteFeature,
  modifyFeatureInput,
  modifyGridInput,
  toggleGridVideo,
  useInputs,
} from 'context/inputs'
import {
  InputUnitProvider,
  inputUnitReducer,
  toggleVideo,
  useInputUnit,
} from 'context/input-unit'
import { ChangeEvent, ReactNode, useEffect, useReducer, useState } from 'react'
import { capitalizedWord, splidId } from 'utils/helper'
import { GroupName, Label } from 'interfaces/inputs'
import { InputUnitType } from 'interfaces/input-unit'

const initialInputUnit: InputUnitType = { isVideo: false }

function InputUnit({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(inputUnitReducer, initialInputUnit)

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

function UnitTitle({
  unitId,
  showDelete = false,
  children,
}: {
  unitId?: string
  showDelete?: boolean
  children: ReactNode
}) {
  useInputUnit('<UnitTitle />')
  const [{ featureSlides }, dispatch] = useInputs()

  const handleClick = () => {
    unitId && deleteFeature(dispatch, unitId)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Typography variant="h6" sx={{ flex: 1 }}>
        {children}
      </Typography>
      {showDelete && featureSlides.length > 1 && (
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={handleClick}
        >
          Delete
        </Button>
      )}
    </Box>
  )
}

function useLabel(
  groupName: string,
  inputKey: string,
  isVideo: boolean = false
) {
  const [label, setLabel] = useState<string>('')

  useEffect(() => {
    if (groupName === GroupName.grid) {
      isVideo ? setLabel(Label.url) : setLabel(Label.filename)
    } else {
      setLabel(capitalizedWord(inputKey))
    }
  }, [groupName, inputKey, isVideo])

  return [label]
}

function UnitTextInput({
  id,
  input,
  unitId,
  isVideo,
}: {
  id: string
  input: string
  unitId?: string
  isVideo?: boolean
}) {
  const [textFieldValue, setTextFieldValue] = useState<string>('')

  const [groupName, order, inputKey] = splidId(id)
  const [label] = useLabel(groupName, inputKey, isVideo)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextFieldValue(e.target.value)
  }

  useEffect(() => {
    setTextFieldValue(input)
  }, [input])

  return (
    <TextField
      id={id}
      label={label}
      variant="standard"
      fullWidth
      value={textFieldValue}
      onChange={handleChange}
    />
  )
}

function UnitSwitch({ id, isVideo: inputsIsVideo }: { id: string; isVideo: boolean }) {
  const [{ isVideo }, dispatch] = useInputUnit('<UnitSwitch />')

  const [groupName, order] = splidId(id)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    toggleVideo(dispatch)
  }

  useEffect(() => {
    toggleVideo(dispatch, inputsIsVideo)
  }, [dispatch, inputsIsVideo])

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
