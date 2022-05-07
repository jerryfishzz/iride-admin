import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import { useEffect, useRef } from 'react'

interface AccordionInputProps {
  title: string
  content?: string
}

export default function AccordionInput({
  title,
  content = '',
}: AccordionInputProps) {
  const textFieldRef = useRef<HTMLInputElement>(null)

  const lowecaseTitle = title.toLowerCase()
  const capitalizedTitle =
    lowecaseTitle.charAt(0).toUpperCase() + lowecaseTitle.slice(1)

  useEffect(() => {
    // This condition is to solve the typescript error 'Object is possibly null'
    if (textFieldRef && textFieldRef.current) {
      textFieldRef.current.value = content
    }
  }, [content])

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="subtitle-content"
        id={`${lowecaseTitle}-header`}
      >
        <Typography variant="button">{lowecaseTitle}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          id={`${lowecaseTitle}-text-field`}
          label={capitalizedTitle}
          variant="standard"
          fullWidth
          inputRef={textFieldRef}
        />
      </AccordionDetails>
    </Accordion>
  )
}
