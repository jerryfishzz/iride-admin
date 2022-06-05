// enum LoneType {
//   subtitle = 'subtitle',
//   fit = 'fit',
//   sizing = 'sizing',
// }

enum Label {
  filename = 'Filename',
  url = 'URL',
}

// Inputs key
enum GroupName {
  grid = 'grid',
  feature = 'feature',
  subtitle = 'subtitle',
  sizing = 'sizing',
  fit = 'fit',
}

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
  [key: string]: string
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
  DELETE_FEATURE = 'DELETE_FEATURE',
  MODIFY_LONE = 'MODIFY_LONE',
  PROCESS_SUBMIT = 'PROCESS_SUBMIT',
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
  | { type: ACTION_TYPE.DELETE_FEATURE; id: string }
  | { type: ACTION_TYPE.MODIFY_LONE; loneType: string; input: string }
  | { type: ACTION_TYPE.PROCESS_SUBMIT; newState: InputsType }

export { Label, GroupName, ACTION_TYPE }
export type { GridImagesType, FeaturSlide, InputsType, Action }
