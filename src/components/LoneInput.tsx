import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import { ChangeEvent, useState } from 'react'

export default function LoneInput({ title }: { title: string }) {
  const [input, setInput] = useState<string>('')

  const lowecaseTitle = title.toLowerCase()
  const capitalizedTitle =
    lowecaseTitle.charAt(0).toUpperCase() + lowecaseTitle.slice(1)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="subtitle-content"
        id={`${lowecaseTitle}Header`}
      >
        <Typography variant="button">{lowecaseTitle}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          id={`${lowecaseTitle}TextField`}
          label={capitalizedTitle}
          variant="standard"
          fullWidth
          value={input}
          onChange={handleChange}
        />
      </AccordionDetails>
    </Accordion>
  )
}
