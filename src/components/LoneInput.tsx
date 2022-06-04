import TextField from '@mui/material/TextField'
import { ChangeEvent } from 'react'
import AccordionInput from './AccordionInput'
import { capitalizedWord, useTextField } from 'utils/helper'

export default function LoneInput({
  input,
  loneType,
}: {
  input: string
  loneType: string
}) {
  const [textFieldValue, setTextFieldValue] = useTextField(input)

  const label = capitalizedWord(loneType)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextFieldValue(e.target.value)
  }

  return (
    <AccordionInput
      title={loneType}
      details={
        <TextField
          id={`${loneType}-input`}
          label={label}
          variant="standard"
          fullWidth
          value={textFieldValue}
          onChange={handleChange}
        />
      }
    />
  )
}
