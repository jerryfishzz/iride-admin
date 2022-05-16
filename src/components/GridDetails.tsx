import { InputUnit, UnitSwitch, UnitTextInput, UnitTitle } from './InputUnit'

export default function GridDetails() {
  return (
    <>
      <InputUnit>
        <UnitTitle>Grid 1</UnitTitle>
        <UnitTextInput id="grid1Filename" />
      </InputUnit>
      <InputUnit>
        <UnitTitle>Grid 2</UnitTitle>
        <UnitTextInput id="grid2Filename" />
        <UnitSwitch />
      </InputUnit>
      <InputUnit>
        <UnitTitle>Grid 3</UnitTitle>
        <UnitTextInput id="grid3Filename" />
        <UnitSwitch />
      </InputUnit>
    </>
  )
}
