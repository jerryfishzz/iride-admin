import TextField from '@mui/material/TextField'
import { ChangeEvent, useEffect, useState } from 'react'
import AccordionInput from './AccordionInput'
import { capitalizedWord } from 'utils/helper'

export default function LoneInput({
  input,
  loneType,
}: {
  input: string
  loneType: string
}) {
  const [textFieldValue, setTextFieldValue] = useState<string>('')

  const title = capitalizedWord(loneType)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextFieldValue(e.target.value)
  }

  useEffect(() => {
    setTextFieldValue(input)
  }, [input])

  return (
    <AccordionInput
      title={title}
      details={
        <TextField
          id={`${loneType}-input`}
          label={title}
          variant="standard"
          fullWidth
          value={textFieldValue}
          onChange={handleChange}
        />
      }
    />
  )
}
