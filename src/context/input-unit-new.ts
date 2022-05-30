import { Action, InputUnitType, Label, ACTION_TYPE } from 'components/InputUnit'
import { Dispatch } from 'react'
import { createCtx } from 'utils/helper'

const [useInputUnit, InputUnitProvider] = createCtx<{}>(
  '<InputUnitProvider />',
  'InputUnitProvider'
)

export { InputUnitProvider, useInputUnit }
