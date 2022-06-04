import { Action, ACTION_TYPE, InputUnitType } from 'interfaces/input-unit'
import { Dispatch } from 'react'
import { createCtx } from 'utils/helper'

const [useInputUnit, InputUnitProvider] = createCtx<
  [InputUnitType, Dispatch<Action>]
>('<InputUnitProvider />', 'InputUnitProvider')

const inputUnitReducer = (state: InputUnitType, action: Action) => {
  switch (action.type) {
    case ACTION_TYPE.TOGGLE_VIDEO:
      return {
        isVideo: action.isVideo === undefined ? !state.isVideo : action.isVideo,
      }
    default:
      throw new Error('Unhandled action type')
  }
}

const toggleVideo = (dispatch: Dispatch<Action>, isVideo?: boolean) => {
  isVideo === undefined
    ? dispatch({ type: ACTION_TYPE.TOGGLE_VIDEO })
    : dispatch({ type: ACTION_TYPE.TOGGLE_VIDEO, isVideo })
}

export { InputUnitProvider, useInputUnit, inputUnitReducer, toggleVideo }
