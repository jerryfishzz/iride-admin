import {
  initialState,
  InputUnitContext,
  modifyInput,
  toggleVideo,
  unitReducer,
  useInputUnit,
} from 'context/input-unit'
import { InputUnit, UnitSwitch, UnitTextInput, UnitTitle } from './InputUnit'

export default function GridDetails() {
  return (
    <>
      <InputUnit
        UnitContext={InputUnitContext}
        reducer={unitReducer}
        initialState={initialState}
      >
        <UnitTitle>Grid 1</UnitTitle>
        <UnitTextInput
          id="grid-1-filename"
          modifyInput={modifyInput}
          useUnit={useInputUnit}
        />
      </InputUnit>
      <InputUnit
        UnitContext={InputUnitContext}
        reducer={unitReducer}
        initialState={initialState}
      >
        <UnitTitle>Grid 2</UnitTitle>
        <UnitTextInput
          id="grid-2-filename"
          modifyInput={modifyInput}
          useUnit={useInputUnit}
        />
        <UnitSwitch toggleVideo={toggleVideo} useUnit={useInputUnit} />
      </InputUnit>
      <InputUnit
        UnitContext={InputUnitContext}
        reducer={unitReducer}
        initialState={initialState}
      >
        <UnitTitle>Grid 3</UnitTitle>
        <UnitTextInput
          id="grid-3-filename"
          modifyInput={modifyInput}
          useUnit={useInputUnit}
        />
        <UnitSwitch toggleVideo={toggleVideo} useUnit={useInputUnit} />
      </InputUnit>
    </>
  )
}
