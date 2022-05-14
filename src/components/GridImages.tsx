import ExpandMore from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import { InputUnit, UnitSwitch, UnitTextInput, UnitTitle } from './InputUnit'

export default function GridImages() {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="grid-content"
        id="grid-header"
      >
        <Typography variant="button">Grid</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <InputUnit>
          <UnitTitle>Grid 1</UnitTitle>
          <UnitTextInput id="grid1Filename" label="Filename" />
        </InputUnit>
        <InputUnit>
          <UnitTitle>Grid 2</UnitTitle>
          <UnitTextInput id="grid2Filename" label="Filename" />
          <UnitSwitch />
        </InputUnit>
        <InputUnit>
          <UnitTitle>Grid 3</UnitTitle>
          <UnitTextInput id="grid3Filename" label="Filename" />
          <UnitSwitch />
        </InputUnit>
      </AccordionDetails>
    </Accordion>
  )
}
