interface InputUnitType {
  isVideo: boolean
}

enum ACTION_TYPE {
  TOGGLE_VIDEO = 'TOGGLE_VIDEO',
}

type Action = { type: ACTION_TYPE.TOGGLE_VIDEO, isVideo?: boolean }

export { ACTION_TYPE }
export type { InputUnitType, Action }
