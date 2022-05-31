import {
  Box,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import {
  modifyFeatureInput,
  modifyGridInput,
  toggleGridVideo,
  useInputs,
} from 'context/inputs'
import { InputUnitProvider, useInputUnit } from 'context/input-unit'
import { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import { capitalizedWord, splidId } from 'utils/helper'

enum Label {
  filename = 'Filename',
  url = 'URL',
}

enum GroupName {
  grid = 'grid',
  feature = 'feature',
}

function InputUnit({ children }: { children: ReactNode }) {
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

function UnitTitle({ children }: { children: ReactNode }) {
  useInputUnit('<UnitTitle />')
  return <Typography variant="h6">{children}</Typography>
}

function useLabel(groupName: string, inputKey: string, isVideo?: boolean) {
  const [label, setLabel] = useState<string>('')

  useEffect(() => {
    if (groupName === GroupName.grid && isVideo !== undefined) {
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
  useInputUnit('<UnitTextInput />')
  const [, dispatch] = useInputs('<UnitTextInput />')

  const [groupName, order, inputKey] = splidId(id)
  const [label] = useLabel(groupName, inputKey, isVideo)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (groupName === GroupName.grid)
      modifyGridInput(dispatch, groupName + order, e.target.value)

    if (groupName === GroupName.feature && unitId)
      modifyFeatureInput(dispatch, e.target.value, inputKey, unitId)
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

function UnitSwitch({ id, isVideo }: { id: string; isVideo: boolean }) {
  useInputUnit('<UnitSwitch />')
  const [, dispatch] = useInputs('<UnitSwitch />')

  const [groupName, order] = splidId(id)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    toggleGridVideo(dispatch, groupName + order, e.target.checked)
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
