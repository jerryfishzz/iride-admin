import { useInputs } from 'context/inputs'
import {
  InputUnit,
  UnitSwitch,
  UnitTextInput,
  UnitTitle,
} from './InputUnit'

export default function GridDetails() {
  const [state] = useInputs()

  return (
    <>
      {Object.values(state.grid).map((grid, index) => {
        const { url, isVideo, filename } = grid
        const order = index + 1

        return (
          <InputUnit key={index}>
            <UnitTitle>{`Grid ${order}`}</UnitTitle>
            <UnitTextInput
              id={`grid-${order}-input`}
              input={isVideo ? url : filename}
            />
            {index > 0 && (
              <UnitSwitch id={`grid-${order}-video`} isVideo={isVideo} />
            )}
          </InputUnit>
        )
      })}
    </>
  )
}
