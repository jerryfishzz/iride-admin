import ExpandMore from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import { ReactNode } from 'react'
import { getKebabCase } from 'utils/helper'

export default function AccordionInput({
  title,
  details,
}: {
  title: string
  details: ReactNode
}) {
  const kebabCaseTitle = getKebabCase(title)

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
