import {
  getGridName,
  InputUnitContext,
  modifyInput,
  toggleVideo,
  unitReducer,
  useInputUnit,
} from 'context/input-unit'
import {
  InputUnit,
  Label,
  UnitSwitch,
  UnitTextInput,
  UnitTitle,
} from './InputUnit'

const gridModel = {
  hasSwitch: true,
  initialState: {
    input: '',
    isVideo: false,
    label: Label.filename,
  },
}

const initialGridImagesState = [
  { ...gridModel, hasSwitch: false },
  { ...gridModel },
  { ...gridModel },
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
              getKey={getGridName}
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
