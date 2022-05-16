import { InputUnit, UnitSwitch, UnitTextInput, UnitTitle } from './InputUnit'

export default function GridDetails() {
  return (
    <>
      <InputUnit>
        <UnitTitle>Grid 1</UnitTitle>
        <UnitTextInput id="grid-1-filename" />
      </InputUnit>
      <InputUnit>
        <UnitTitle>Grid 2</UnitTitle>
        <UnitTextInput id="grid-2-filename" />
        <UnitSwitch />
      </InputUnit>
      <InputUnit>
        <UnitTitle>Grid 3</UnitTitle>
        <UnitTextInput id="grid-3-filename" />
        <UnitSwitch />
      </InputUnit>
    </>
  )
}
