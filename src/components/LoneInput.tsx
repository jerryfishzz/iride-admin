import TextField from '@mui/material/TextField'
import { ChangeEvent } from 'react'
import AccordionInput from './AccordionInput'
import { capitalizedWord } from 'utils/helper'
import { modifyLone, useInputs } from 'context/inputs'

export default function LoneInput({ loneType }: { loneType: string }) {
  const [state, dispatch] = useInputs()

  const title = capitalizedWord(loneType)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    modifyLone(dispatch, loneType, e.target.value)
  }

  return (
    <AccordionInput
      title={title}
      details={
        <TextField
          id={`${loneType}-input`}
          label={title}
          variant="standard"
          fullWidth
          value={state[loneType]}
          onChange={handleChange}
        />
      }
    />
  )
}
