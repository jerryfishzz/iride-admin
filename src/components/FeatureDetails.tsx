import { InputUnit, UnitTextInput, UnitTitle } from './InputUnit'

export default function FeatureDetails() {
  return (
    <>
      <InputUnit>
        <UnitTitle>Feature 1</UnitTitle>
        <UnitTextInput id="feature-1-filename" label="Filename" />
        <UnitTextInput id="feature-1-heading" label="Heading" />
        <UnitTextInput id="feature-1-description" label="Description" />
      </InputUnit>
    </>
  )
}
