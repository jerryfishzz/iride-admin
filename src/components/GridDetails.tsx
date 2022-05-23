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
        const order = index + 1

        return (
          <InputUnit
            key={index}
            UnitContext={InputUnitContext}
            reducer={unitReducer}
            initialState={initialState}
          >
            <UnitTitle useUnit={useInputUnit}>{`Grid ${order}`}</UnitTitle>
            <UnitTextInput
              id={`grid-${order}-filename`}
              modifyInput={modifyInput}
              useUnit={useInputUnit}
              keyName={`grid${order}`}
              inputKey="input"
            />
            {hasSwitch && (
              <UnitSwitch
                toggleVideo={toggleVideo}
                useUnit={useInputUnit}
                keyName={`grid${order}`}
              />
            )}
          </InputUnit>
        )
      })}
    </>
  )
}
