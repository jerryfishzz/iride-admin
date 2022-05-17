import {
  initialState,
  InputUnitContext,
  modifyInput,
  toggleVideo,
  unitReducer,
  useInputUnit,
} from 'context/input-unit'
import { InputUnit, UnitSwitch, UnitTextInput, UnitTitle } from './InputUnit'

const hasSwitch1 = false
const hasSwitch2 = true
const hasSwitch3 = true

export default function GridDetails() {
  return (
    <>
      <InputUnit
        UnitContext={InputUnitContext}
        reducer={unitReducer}
        initialState={initialState}
      >
        <UnitTitle useUnit={useInputUnit}>Grid 1</UnitTitle>
        <UnitTextInput
          id="grid-1-filename"
          modifyInput={modifyInput}
          useUnit={useInputUnit}
        />
        {hasSwitch1 && <UnitSwitch toggleVideo={toggleVideo} useUnit={useInputUnit} />}
      </InputUnit>
      <InputUnit
        UnitContext={InputUnitContext}
        reducer={unitReducer}
        initialState={initialState}
      >
        <UnitTitle useUnit={useInputUnit}>Grid 2</UnitTitle>
        <UnitTextInput
          id="grid-2-filename"
          modifyInput={modifyInput}
          useUnit={useInputUnit}
        />
        {hasSwitch2 && <UnitSwitch toggleVideo={toggleVideo} useUnit={useInputUnit} />}
      </InputUnit>
      <InputUnit
        UnitContext={InputUnitContext}
        reducer={unitReducer}
        initialState={initialState}
      >
        <UnitTitle useUnit={useInputUnit}>Grid 3</UnitTitle>
        <UnitTextInput
          id="grid-3-filename"
          modifyInput={modifyInput}
          useUnit={useInputUnit}
        />
        {hasSwitch3 && <UnitSwitch toggleVideo={toggleVideo} useUnit={useInputUnit} />}
      </InputUnit>
    </>
  )
}
