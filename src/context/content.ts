import { Dispatch } from 'react'
import { createCtx } from 'utils/helper'

interface GridModel {
  url: string
  isVideo: boolean
  filename: string
}

interface Grid {
  [key: string]: GridModel
}

interface Input {
  grid: Grid
}

interface ContentType {
  input: Input
}

enum ACTION_TYPE {
  TOGGLE_GRID_VIDEO = 'TOGGLE_GRID_VIDEO',
  MODIFY_GRID_INPUT = 'MODIFY_GRID_INPUT',
}

type Action =
  | { type: ACTION_TYPE.TOGGLE_GRID_VIDEO; gridName: string; isVideo: boolean }
  | { type: ACTION_TYPE.MODIFY_GRID_INPUT; gridName: string; input: string }

const [useContent, ContentProvider] = createCtx<
  [ContentType, Dispatch<Action>]
>('ContentContext', '<ContentProvider />')

const contentReducer = (state: ContentType, action: Action) => {
  switch (action.type) {
    case ACTION_TYPE.TOGGLE_GRID_VIDEO:
      return {
        ...state,
        input: {
          grid: {
            ...state.input.grid,
            [action.gridName]: {
              ...state.input.grid[action.gridName],
              isVideo: action.isVideo,
            },
          },
        }
      }
    case ACTION_TYPE.MODIFY_GRID_INPUT:
      return {
        ...state,
        input: {
          grid: {
            ...state.input.grid,
            [action.gridName]: {
              ...state.input.grid[action.gridName],
              url: state.input.grid[action.gridName].isVideo
                ? action.input
                : state.input.grid[action.gridName].url,
              filename: !state.input.grid[action.gridName].isVideo
                ? action.input
                : state.input.grid[action.gridName].filename,
            },
          },
        }
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
  dispatch({ type: ACTION_TYPE.TOGGLE_GRID_VIDEO, gridName,isVideo })
}

export { useContent, ContentProvider, contentReducer, modifyGridInput, toggleGridVideo }
