import {
  Box,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import {
  ChangeEvent,
  createContext,
  Dispatch,
  useContext,
  useReducer,
} from 'react'

interface InitialState {
  input: string
  isVideo: boolean
}

const initialState = {
  input: '',
  isVideo: false,
}

enum ACTION_TYPE {
  TOGGLE_VIDEO = 'TOGGLE_VIDEO',
  MODIFY_INPUT = 'MODIFY_INPUT',
}

type Action =
  | { type: ACTION_TYPE.TOGGLE_VIDEO }
  | { type: ACTION_TYPE.MODIFY_INPUT; input: string }

function createCtx<A extends {} | null>() {
  const ctx = createContext<A | undefined>(undefined)
  function useCtx() {
    const c = useContext(ctx)
    if (c === undefined)
      throw new Error('useCtx must be inside a Provider with a value')
    return c
  }
  return [useCtx, ctx.Provider] as const // 'as const' makes TypeScript infer a tuple
}

const InputUnitContext = createContext<
  [InitialState, Dispatch<Action>] | undefined
>(undefined)

// const [useInputUnit, InputUnitProvider] = createCtx<[InitialState, Dispatch<Action>]>()

const unitReducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case ACTION_TYPE.TOGGLE_VIDEO:
      return {
        ...state,
        isVideo: !state.isVideo,
      }
    case ACTION_TYPE.MODIFY_INPUT:
      return {
        ...state,
        input: action.input,
      }
    default:
      throw new Error('Unhandled action type')
  }
}

const modifyInput = (dispatch: Dispatch<Action>, input: string) => {
  dispatch({ type: ACTION_TYPE.MODIFY_INPUT, input })
}

const toggleVideo = (dispatch: Dispatch<Action>) => {
  dispatch({ type: ACTION_TYPE.TOGGLE_VIDEO })
}

// function InputUnit({ children }: { children: React.ReactNode }) {
//   const [state, dispatch] = useReducer(unitReducer, initialState)

//   return (
//     <InputUnitProvider value={[state, dispatch]}>
//       <Box
//         sx={{
//           my: 2,
//         }}
//       >
//         {children}
//       </Box>
//     </InputUnitProvider>
//   )
// }

function InputUnit({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(unitReducer, initialState)

  return (
    <InputUnitContext.Provider value={[state, dispatch]}>
      <Box
        sx={{
          my: 2,
        }}
      >
        {children}
      </Box>
    </InputUnitContext.Provider>
  )
}

function useInputUnit() {
  const context = useContext(InputUnitContext)
  if (context === undefined) {
    throw new Error('useInputUnit must be inside <InputUnit /> with a value')
  }
  return context
}

function UnitTitle({ children }: { children: React.ReactNode }) {
  useInputUnit()
  return <Typography variant="h6">{children}</Typography>
}

interface UnitTextInputProps {
  id: string
  label: string
}

function UnitTextInput({ id, label }: UnitTextInputProps) {
  const [{ input }, dispatch] = useInputUnit()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    modifyInput(dispatch, e.target.value)
  }

  return (
    <TextField
      id={id}
      label={label}
      variant="standard"
      fullWidth
      value={input}
      onChange={handleChange}
    />
  )
}

function UnitSwitch() {
  useInputUnit()

  return (
    <Box
      sx={{
        my: 1,
      }}
    >
      <FormControlLabel control={<Switch />} label="Video" />
    </Box>
  )
}

export { InputUnit, UnitTitle, UnitTextInput, UnitSwitch }
