import { Action, ACTION_TYPE, FeaturSlide, InputsType } from 'interfaces/inputs'
import { Dispatch } from 'react'
import { createCtx } from 'utils/helper'

const [useInputs, InputsProvider] = createCtx<[InputsType, Dispatch<Action>]>(
  '<InputsProvider />',
  'InputsProvider'
)

const inputsReducer = (state: InputsType, action: Action) => {
  switch (action.type) {
    case ACTION_TYPE.TOGGLE_GRID_VIDEO:
      return {
        ...state,
        grid: {
          ...state.grid,
          [action.gridName]: {
            ...state.grid[action.gridName],
            isVideo: action.isVideo,
          },
        },
      }
    case ACTION_TYPE.MODIFY_GRID_INPUT:
      return {
        ...state,
        grid: {
          ...state.grid,
          [action.gridName]: {
            ...state.grid[action.gridName],
            url: state.grid[action.gridName].isVideo
              ? action.input
              : state.grid[action.gridName].url,
            filename: !state.grid[action.gridName].isVideo
              ? action.input
              : state.grid[action.gridName].filename,
          },
        },
      }
    case ACTION_TYPE.MODIFY_FEATURE_INPUT:
      return {
        ...state,
        featureSlides: state.featureSlides.map(featureSlide => {
          if (featureSlide.id === action.id) {
            return {
              ...featureSlide,
              [action.inputKey]: action.input,
            }
          }
          return featureSlide
        }),
      }
    case ACTION_TYPE.ADD_FEATURE:
      return {
        ...state,
        featureSlides: [...state.featureSlides, action.newFeature],
      }
    case ACTION_TYPE.MODIFY_LONE:
      return {
        ...state,
        [action.loneType]: action.input,
      }
    default:
      throw new Error('Unhandled action type')
  }
}

const modifyGridInput = (
  dispatch: Dispatch<Action>,
  gridName: string,
  input: string
) => {
  dispatch({ type: ACTION_TYPE.MODIFY_GRID_INPUT, gridName, input })
}

const toggleGridVideo = (
  dispatch: Dispatch<Action>,
  gridName: string,
  isVideo: boolean
) => {
  dispatch({ type: ACTION_TYPE.TOGGLE_GRID_VIDEO, gridName, isVideo })
}

const modifyFeatureInput = (
  dispatch: Dispatch<Action>,
  input: string,
  inputKey: string,
  id: string
) => {
  dispatch({
    type: ACTION_TYPE.MODIFY_FEATURE_INPUT,
    input,
    inputKey,
    id,
  })
}

const addFeature = (dispatch: Dispatch<Action>, newFeature: FeaturSlide) => {
  dispatch({ type: ACTION_TYPE.ADD_FEATURE, newFeature })
}

const modifyLone = (
  dispatch: Dispatch<Action>,
  loneType: string,
  input: string
) => {
  dispatch({ type: ACTION_TYPE.MODIFY_LONE, loneType, input })
}

export {
  useInputs,
  InputsProvider,
  inputsReducer,
  modifyGridInput,
  toggleGridVideo,
  modifyFeatureInput,
  addFeature,
  modifyLone,
}
