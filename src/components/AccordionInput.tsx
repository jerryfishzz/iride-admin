import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'

interface AccordionInputProps {
  title: string
}

export default function AccordionInput({ title }: AccordionInputProps) {
  const lowecaseTitle = title.toLowerCase()
  const capitalizedTitle =
    lowecaseTitle.charAt(0).toUpperCase() + lowecaseTitle.slice(1)

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
        />
      </AccordionDetails>
    </Accordion>
  )
}
