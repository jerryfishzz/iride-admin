import { Action, InitialState, ACTION_TYPE } from 'components/InputUnit'
import { createContext, Dispatch, useContext } from 'react'

const FeatureContext = createContext<
  [InitialState, Dispatch<Action>] | undefined
>(undefined)

const featureReducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case ACTION_TYPE.MODIFY_INPUT:
      return {
        ...state,
        [action.key]: action.input,
      }
    default:
      throw new Error('Unhandled action type')
  }
}

function useFeature() {
  const context = useContext(FeatureContext)
  if (context === undefined) {
    throw new Error('useFeature must be inside <InputUnit /> with a value')
  }
  return context
}

const modifyInput = (
  dispatch: Dispatch<Action>,
  input: string,
  key: string
) => {
  dispatch({ type: ACTION_TYPE.MODIFY_INPUT, input, key })
}

export { FeatureContext, featureReducer, useFeature, modifyInput }
