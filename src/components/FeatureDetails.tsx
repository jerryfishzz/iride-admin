import { Button } from '@mui/material'
import {
  FeaturSlide,
  getIntialFeature,
  useInputs,
  addFeature,
} from 'context/inputs'
import { useEffect, useState } from 'react'
import { createUniqId } from 'utils/helper'
import { InputUnit, UnitTextInput, UnitTitle } from '../archive/components/InputUnit'

// Using function to return the intial state can guarantee the id will be always random
const getFeatureModel = () => ({
  id: createUniqId(),
  filename: '',
  heading: '',
  description: '',
})

const initialFeaturesState = [getFeatureModel()]

export default function FeatureDetails() {
  const [featuresState, setFeaturesState] =
    useState<FeaturSlide[]>(initialFeaturesState)
  // Using lazy load here is just to avoid invoking the initial creator and creating useless random id.
  // Not necessary, just look tidy.

  const [, dispatch] = useInputs()

  const handleAdd = () => {
    const newFeature = getFeatureModel()

    setFeaturesState(prev => [...prev, newFeature])
    addFeature(dispatch, newFeature)
  }

  useEffect(() => {
    getIntialFeature(dispatch, initialFeaturesState)
  }, [dispatch])

  return (
    <>
      {featuresState.map((initialFeatureState, index) => {
        const order = index + 1

        return (
          <InputUnit
            key={initialFeatureState.id}
            initialState={initialFeatureState}
          >
            <UnitTitle>Feature {order}</UnitTitle>
            <UnitTextInput
              id={`feature-${order}-filename`}
              label="Filename"
              handler={`feature${order}`}
              inputKey="filename"
            />
            <UnitTextInput
              id={`feature-${order}-heading`}
              label="Heading"
              handler={`feature${order}`}
              inputKey="heading"
            />
            <UnitTextInput
              id={`feature-${order}-description`}
              label="Description"
              handler={`feature${order}`}
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
