import AccordionInput from './AccordionInput'
import GridDetails from './GridDetails'
import { InitialState, Label } from './InputUnit'

interface GridImage {
  hasSwitch: boolean
  initialState: InitialState
}

interface GridImagesProps {
  gridImages: GridImage[]
}

const initialGrid = {
  hasSwitch: true,
  initialState: {
    input: '',
    isVideo: false,
    label: Label.filename,
  },
}

const createInitialGridState = () => {
  return [{ ...initialGrid, hasSwitch: false }, initialGrid, initialGrid]
}

export default function GridImages({ gridImages }: GridImagesProps) {
  return (
    <AccordionInput
      title="Grid"
      details={<GridDetails gridImages={gridImages} />}
    />
  )
}

export { createInitialGridState }
export type { GridImage, GridImagesProps }
