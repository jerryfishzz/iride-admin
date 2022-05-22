import { Action, ACTION_TYPE, InitialState, Label } from 'components/InputUnit'
import { createContext, Dispatch, useContext } from 'react'

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

const getGridName = (id: string) => {
  switch (id) {
    case 'grid-1-filename':
      return 'grid1'
    case 'grid-2-filename':
      return 'grid2'
    case 'grid-3-filename':
      return 'grid3'
    default:
      throw Error('This should not happen')
  }
}

export {
  InputUnitContext,
  unitReducer,
  useInputUnit,
  modifyInput,
  toggleVideo,
  Label,
  getGridName,
}
