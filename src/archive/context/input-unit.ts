import {
  Action,
  InputUnitType,
  Label,
  ACTION_TYPE,
} from 'archive/components/InputUnit'
import { Dispatch } from 'react'
import { createCtx } from 'utils/helper'

const [useInputUnit, InputUnitProvider] = createCtx<
  [InputUnitType, Dispatch<Action>]
>('<InputUnitProvider />', 'InputUnitProvider')

const inputUnitReducer = (state: InputUnitType, action: Action) => {
  switch (action.type) {
    case ACTION_TYPE.TOGGLE_VIDEO:
      return {
        ...state,
        isVideo: action.isVideo,
        label: action.isVideo ? Label.url : Label.filename,
      }
    case ACTION_TYPE.MODIFY_INPUT:
      return {
        ...state,
        [action.key]: action.input,
      }
    default:
      throw new Error('Unhandled action type')
  }
}

const modifyInput = (
  dispatch: Dispatch<Action>,
  input: string,
  key: string
) => {
  dispatch({ type: ACTION_TYPE.MODIFY_INPUT, input, key })
}

const toggleVideo = (dispatch: Dispatch<Action>, isVideo: boolean) => {
  dispatch({ type: ACTION_TYPE.TOGGLE_VIDEO, isVideo })
}

export {
  InputUnitProvider,
  inputUnitReducer,
  useInputUnit,
  modifyInput,
  toggleVideo,
}
