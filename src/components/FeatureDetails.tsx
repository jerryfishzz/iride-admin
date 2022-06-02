import { Button } from '@mui/material'
import { useInputs, addFeature } from 'context/inputs'
import { createUniqId } from 'utils/helper'
import { InputUnit, UnitTextInput, UnitTitle } from './InputUnit'

// Using function to return the intial state can guarantee the id will be always random
const getFeatureModel = () => ({
  id: createUniqId(),
  filename: '',
  heading: '',
  description: '',
})

export default function FeatureDetails() {
  const [state, dispatch] = useInputs()

  const handleAdd = () => {
    const newFeature = getFeatureModel()
    addFeature(dispatch, newFeature)
  }

  return (
    <>
      {state.featureSlides.map(
        ({ id, filename, description, heading }, index) => {
          const order = index + 1

          return (
            <InputUnit key={id}>
              <UnitTitle showDelete={true} unitId={id}>
                Feature {order}
              </UnitTitle>
              <UnitTextInput
                id={`feature-${order}-filename`}
                input={filename}
                unitId={id}
              />
              <UnitTextInput
                id={`feature-${order}-heading`}
                input={heading}
                unitId={id}
              />
              <UnitTextInput
                id={`feature-${order}-description`}
                input={description}
                unitId={id}
              />
            </InputUnit>
          )
        }
      )}
      <Button variant="contained" onClick={handleAdd}>
        Add
      </Button>
    </>
  )
}
