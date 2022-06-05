interface InputUnitType {
  isVideo: boolean
}

interface UnitInputDataSet extends DOMStringMap {
  gridInput: string
  unitId: string
}

interface UnitInputElement extends HTMLInputElement {
  dataset: UnitInputDataSet
}

enum ACTION_TYPE {
  TOGGLE_VIDEO = 'TOGGLE_VIDEO',
}

type Action = { type: ACTION_TYPE.TOGGLE_VIDEO, isVideo?: boolean }

export { ACTION_TYPE }
export type { InputUnitType, Action, UnitInputElement }
