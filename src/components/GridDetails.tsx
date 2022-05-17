import {
  InputUnitContext,
  modifyInput,
  toggleVideo,
  unitReducer,
  useInputUnit,
} from 'context/input-unit'
import { GridImagesProps } from './GridImages'
import { InputUnit, UnitSwitch, UnitTextInput, UnitTitle } from './InputUnit'

export default function GridDetails({ gridImages }: GridImagesProps) {
  return (
    <>
      {gridImages.map((gridImage, index) => {
        const { hasSwitch, initialState } = gridImage

        return (
          <InputUnit
            key={index}
            UnitContext={InputUnitContext}
            reducer={unitReducer}
            initialState={initialState}
          >
            <UnitTitle useUnit={useInputUnit}>{`Grid ${index + 1}`}</UnitTitle>
            <UnitTextInput
              id={`grid-${index + 1}-filename`}
              modifyInput={modifyInput}
              useUnit={useInputUnit}
            />
            {hasSwitch && (
              <UnitSwitch toggleVideo={toggleVideo} useUnit={useInputUnit} />
            )}
          </InputUnit>
        )
      })}
    </>
  )
}
