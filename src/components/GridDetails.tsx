import {
  InputUnitContext,
  modifyInput,
  toggleVideo,
  unitReducer,
  useInputUnit,
} from 'context/grid-images'
import { createUniqId } from 'utils/helper'
import {
  InputUnit,
  Label,
  UnitSwitch,
  UnitTextInput,
  UnitTitle,
} from './InputUnit'

const getGridModel = () => ({
  hasSwitch: true,
  initialState: {
    id: createUniqId(),
    input: '',
    isVideo: false,
    label: Label.filename,
  },
})

const initialGridImagesState = [
  { ...getGridModel(), hasSwitch: false },
  { ...getGridModel() },
  { ...getGridModel() },
]

export default function GridDetails() {
  return (
    <>
      {initialGridImagesState.map((initialGridImageState, index) => {
        const { hasSwitch, initialState } = initialGridImageState

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
              keyName={`grid${index + 1}`}
              inputKey="input"
            />
            {hasSwitch && (
              <UnitSwitch
                toggleVideo={toggleVideo}
                useUnit={useInputUnit}
                keyName={`grid${index + 1}`}
              />
            )}
          </InputUnit>
        )
      })}
    </>
  )
}
