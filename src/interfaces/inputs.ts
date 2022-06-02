enum LoneType {
  subtitle,
  fit,
  sizing,
}

enum Label {
  filename = 'Filename',
  url = 'URL',
}

// Inputs key
enum GroupName {
  grid = 'grid',
  feature = 'feature',
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

export { LoneType, Label, GroupName, ACTION_TYPE }
export type { GridImagesType, FeaturSlide, InputsType, Action }