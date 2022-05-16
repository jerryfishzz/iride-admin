import ExpandMore from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import { ReactNode } from 'react'

interface AccordionInputProps {
  title: string
  details: ReactNode
}

export default function AccordionInput({
  title,
  details,
}: AccordionInputProps) {
  const kebabCaseTitle = title.toLowerCase().replace(' ', '-')

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls={`${kebabCaseTitle}-content`}
        id={`${kebabCaseTitle}-header`}
      >
        <Typography variant="button">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{details}</AccordionDetails>
    </Accordion>
  )
}
