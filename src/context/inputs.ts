import { Dispatch } from 'react'
import { createCtx } from 'utils/helper'

interface GridType {
  url: string
  isVideo: boolean
  filename: string
}

interface GridImagesType {
  [key: string]: GridType
}

interface FeaturSlide {
  id: string
  description: string
  filename: string
  heading: string
}

interface InputsType {
  grid: GridImagesType
  featureSlides: FeaturSlide[]
  subtitle: string
  fit: string
  sizing: string
  [key: string]: string | GridImagesType | FeaturSlide[]
}

enum ACTION_TYPE {
  TOGGLE_GRID_VIDEO = 'TOGGLE_GRID_VIDEO',
  MODIFY_GRID_INPUT = 'MODIFY_GRID_INPUT',
  MODIFY_FEATURE_INPUT = 'MODIFY_FEATURE_INPUT',
  ADD_FEATURE = 'ADD_FEATURE',
  MODIFY_LONE = 'MODIFY_LONE',
}

type Action =
  | { type: ACTION_TYPE.TOGGLE_GRID_VIDEO; gridName: string; isVideo: boolean }
  | { type: ACTION_TYPE.MODIFY_GRID_INPUT; gridName: string; input: string }
  | {
      type: ACTION_TYPE.MODIFY_FEATURE_INPUT
      input: string
      inputKey: string
      id: string
    }
  | { type: ACTION_TYPE.ADD_FEATURE; newFeature: FeaturSlide }
  | { type: ACTION_TYPE.MODIFY_LONE; loneType: string; input: string }

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
