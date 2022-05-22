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

interface InitialContent {
  grid: Grid
}

enum ACTION_TYPE {
  TOGGLE_GRID_VIDEO = 'TOGGLE_GRID_VIDEO',
  MODIFY_GRID_INPUT = 'MODIFY_GRID_INPUT',
}

type Action =
  | { type: ACTION_TYPE.TOGGLE_GRID_VIDEO; gridName: string; isVideo: boolean }
  | { type: ACTION_TYPE.MODIFY_GRID_INPUT; gridName: string; input: string }

const [useContent, ContentProvider] = createCtx<
  [InitialContent, Dispatch<Action>]
>('ContentContext', '<ContentProvider />')

const contentReducer = (state: InitialContent, action: Action) => {
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

export { useContent, ContentProvider, contentReducer, modifyGridInput }
