import {
  FeatureContext,
  featureReducer,
  modifyInput,
  useFeature,
} from 'context/features'
import { InputUnit, UnitTextInput, UnitTitle } from './InputUnit'

const featureModel = {
  filename: '',
  heading: '',
  description: '',
}

const initialFeaturesState = [{ ...featureModel }]

export default function FeatureDetails() {
  return (
    <>
      {initialFeaturesState.map((initialFeatureState, index) => (
        <InputUnit
          key={index}
          UnitContext={FeatureContext}
          reducer={featureReducer}
          initialState={initialFeatureState}
        >
          <UnitTitle useUnit={useFeature}>Feature 1</UnitTitle>
          <UnitTextInput
            id="feature-1-filename"
            label="Filename"
            modifyInput={modifyInput}
            useUnit={useFeature}
            inputKey="filename"
          />
          <UnitTextInput
            id="feature-1-heading"
            label="Heading"
            modifyInput={modifyInput}
            useUnit={useFeature}
            inputKey="heading"
          />
          <UnitTextInput
            id="feature-1-description"
            label="Description"
            modifyInput={modifyInput}
            useUnit={useFeature}
            inputKey="description"
          />
        </InputUnit>
      ))}
    </>
  )
}
