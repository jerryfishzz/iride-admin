import { Button } from '@mui/material'
import {
  FeatureContext,
  featureReducer,
  modifyInput,
  useFeature,
} from 'context/features'
import { useState } from 'react'
import { createUniqId } from 'utils/helper'
import { InitialState, InputUnit, UnitTextInput, UnitTitle } from './InputUnit'

const getFeatureModel = () => ({
  id: createUniqId(),
  filename: '',
  heading: '',
  description: '',
})

export default function FeatureDetails() {
  const [initialFeaturesState, setInitialFeaturesState] = useState<
    InitialState[]
  >(() => [{ ...getFeatureModel() }])

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
