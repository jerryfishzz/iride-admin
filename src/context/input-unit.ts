import { createCtx } from 'utils/helper'

const [useInputUnit, InputUnitProvider] = createCtx<{}>(
  '<InputUnitProvider />',
  'InputUnitProvider'
)

export { InputUnitProvider, useInputUnit }
