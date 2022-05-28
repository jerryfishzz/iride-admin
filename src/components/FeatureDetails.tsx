import { Button } from '@mui/material'
import {
  FeatureContext,
  featureReducer,
  modifyInput,
  useFeature,
} from 'context/features'
import { useState } from 'react'
import { createUniqId } from 'utils/helper'
import { InputUnitType, InputUnit, UnitTextInput, UnitTitle } from './InputUnit'

// Using function to return the intial state can guarantee the id will be always random
const getFeatureModel = () => ({
  id: createUniqId(),
  filename: '',
  heading: '',
  description: '',
})

export default function FeatureDetails() {
  const [initialFeaturesState, setInitialFeaturesState] = useState<
    InputUnitType[]
  >(() => [{ ...getFeatureModel() }])
  // Using lazy load here is just to avoid invoking the initial creator and creating useless random id.
  // Not necessary, just look tidy.

  const handleAdd = () => {
    setInitialFeaturesState(prev => [...prev, { ...getFeatureModel() }])
  }

  return (
    <>
      {initialFeaturesState.map((initialFeatureState, index) => {
        const order = index + 1

        return (
          <InputUnit
            key={initialFeatureState.id}
            UnitContext={FeatureContext}
            reducer={featureReducer}
            initialState={initialFeatureState}
          >
            <UnitTitle useUnit={useFeature}>Feature {order}</UnitTitle>
            <UnitTextInput
              id={`feature-${order}-filename`}
              label="Filename"
              modifyInput={modifyInput}
              useUnit={useFeature}
              inputKey="filename"
            />
            <UnitTextInput
              id={`feature-${order}-heading`}
              label="Heading"
              modifyInput={modifyInput}
              useUnit={useFeature}
              inputKey="heading"
            />
            <UnitTextInput
              id={`feature-${order}-description`}
              label="Description"
              modifyInput={modifyInput}
              useUnit={useFeature}
              inputKey="description"
            />
          </InputUnit>
        )
      })}
      <Button variant="contained" onClick={handleAdd}>
        Add
      </Button>
    </>
  )
}
