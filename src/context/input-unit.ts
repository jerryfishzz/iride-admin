import { createCtx } from 'utils/helper'

// This is just a context to create the structure of input unit composite component. No data sharing.
const [useInputUnit, InputUnitProvider] = createCtx<{}>(
  '<InputUnitProvider />',
  'InputUnitProvider'
)

export { InputUnitProvider, useInputUnit }
