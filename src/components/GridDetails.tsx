import { modifyInput, toggleVideo } from 'context/input-unit'
import { InputUnit, UnitSwitch, UnitTextInput, UnitTitle } from './InputUnit'

export default function GridDetails() {
  return (
    <>
      <InputUnit>
        <UnitTitle>Grid 1</UnitTitle>
        <UnitTextInput id="grid-1-filename" modifyInput={modifyInput} />
      </InputUnit>
      <InputUnit>
        <UnitTitle>Grid 2</UnitTitle>
        <UnitTextInput id="grid-2-filename" modifyInput={modifyInput} />
        <UnitSwitch toggleVideo={toggleVideo} />
      </InputUnit>
      <InputUnit>
        <UnitTitle>Grid 3</UnitTitle>
        <UnitTextInput id="grid-3-filename" modifyInput={modifyInput} />
        <UnitSwitch toggleVideo={toggleVideo} />
      </InputUnit>
    </>
  )
}
