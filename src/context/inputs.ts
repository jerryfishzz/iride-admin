import { InputUnitType } from 'components/InputUnit'
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

interface FeaturSlide extends InputUnitType {
  description: string
  filename: string
  heading: string
}

interface InputsType {
  grid: GridImagesType
  featureSlides: FeaturSlide[] | []
}

enum ACTION_TYPE {
  TOGGLE_GRID_VIDEO = 'TOGGLE_GRID_VIDEO',
  MODIFY_GRID_INPUT = 'MODIFY_GRID_INPUT',
  MODIFY_FEATURE_INPUT = 'MODIFY_FEATURE_INPUT',
  GET_INITIAL_FEATURE = 'GET_INITIAL_FEATURE',
}

type Action =
  | { type: ACTION_TYPE.TOGGLE_GRID_VIDEO; gridName: string; isVideo: boolean }
  | { type: ACTION_TYPE.MODIFY_GRID_INPUT; gridName: string; input: string }
  | {
      type: ACTION_TYPE.MODIFY_FEATURE_INPUT
      groupName: string
      input: string
      inputKey: string
      id: string
    }
  | { type: ACTION_TYPE.GET_INITIAL_FEATURE; initialFeature: FeaturSlide[] }

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
    case ACTION_TYPE.GET_INITIAL_FEATURE:
      return {
        ...state,
        featureSlides: action.initialFeature,
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
  groupName: string,
  input: string,
  inputKey: string,
  id: string
) => {
  dispatch({
    type: ACTION_TYPE.MODIFY_FEATURE_INPUT,
    groupName,
    input,
    inputKey,
    id,
  })
}

const getIntialFeature = (
  dispatch: Dispatch<Action>,
  initialFeature: FeaturSlide[]
) => {
  dispatch({ type: ACTION_TYPE.GET_INITIAL_FEATURE, initialFeature })
}

export {
  useInputs,
  InputsProvider,
  inputsReducer,
  modifyGridInput,
  toggleGridVideo,
  modifyFeatureInput,
  getIntialFeature,
}

export type { FeaturSlide }
