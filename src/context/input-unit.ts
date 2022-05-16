import { Action, ACTION_TYPE, InitialState, Label } from 'components/InputUnit'
import { createContext, Dispatch, useContext } from 'react'

const initialState = {
  input: '',
  isVideo: false,
  label: Label.filename,
}

const InputUnitContext = createContext<
  [InitialState, Dispatch<Action>] | undefined
>(undefined)

const unitReducer = (state: InitialState, action: Action) => {
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
        input: action.input,
      }
    default:
      throw new Error('Unhandled action type')
  }
}

function useInputUnit() {
  const context = useContext(InputUnitContext)
  if (context === undefined) {
    throw new Error('useInputUnit must be inside <InputUnit /> with a value')
  }
  return context
}

const modifyInput = (dispatch: Dispatch<Action>, input: string) => {
  dispatch({ type: ACTION_TYPE.MODIFY_INPUT, input })
}

const toggleVideo = (dispatch: Dispatch<Action>, isVideo: boolean) => {
  dispatch({ type: ACTION_TYPE.TOGGLE_VIDEO, isVideo })
}

export {
  InputUnitContext,
  unitReducer,
  useInputUnit,
  modifyInput,
  toggleVideo,
  Label,
  initialState,
}
