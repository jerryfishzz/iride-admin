import TextField from '@mui/material/TextField'
import { ChangeEvent, useState } from 'react'
import AccordionInput from './AccordionInput'
import { getKebabCase } from 'utils/helper'

export default function LoneInput({ title }: { title: string }) {
  const [input, setInput] = useState<string>('')

  const kebabCaseTitle = getKebabCase(title)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  return (
    <AccordionInput
      title={title}
      details={
        <TextField
          id={`${kebabCaseTitle}-textfield`}
          label={title}
          variant="standard"
          fullWidth
          value={input}
          onChange={handleChange}
        />
      }
    />
  )
}
