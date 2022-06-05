import { UnitInputElement } from 'interfaces/input-unit'
import { GroupName, InputsType, Label } from 'interfaces/inputs'
import { createContext, useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

// Helper function to create a context without needing to give a default value as the parameter to createContext.
// The null in generic looks not very useful. Just no idea why it is added here.
// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/
function createCtx<A extends {} | null>(
  providerName: string,
  displayName?: string
) {
  const ctx = createContext<A | undefined>(undefined)

  if (ctx && displayName) {
    ctx.displayName = displayName
  }

  function useCtx(componentName: string = 'Consumer components') {
    const c = useContext(ctx)
    if (c === undefined)
      throw new Error(
        `${componentName} must be inside ${providerName} with a value`
      )
    return c
  }
  return [useCtx, ctx.Provider] as const // 'as const' makes TypeScript infer a tuple
}

function getKebabCase(str: string): string {
  return str.toLowerCase().replace(' ', '-')
}

function createUniqId() {
  const id = uuidv4()
  return id
}

function splidId(id: string): string[] {
  return id.split('-')
}

function capitalizedWord(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

function useTextField(input: string) {
  const [textFieldValue, setTextFieldValue] = useState<string>('')

  useEffect(() => {
    setTextFieldValue(input)
  }, [input])

  return [textFieldValue, setTextFieldValue] as const
}

function handleSubmitData(
  state: InputsType,
  elements: HTMLFormControlsCollection
): InputsType {
  let newState = { ...state }

  for (let index = 0; index < elements.length; index++) {
    const element = elements[index] as UnitInputElement

    if (element.nodeName === 'BUTTON') continue

    const value = element.value
    const [groupName, order, inputKey] = splidId(element.id)

    switch (groupName) {
      case GroupName.grid:
        element.type === 'text'
          ? element.dataset.gridInput === Label.filename
            ? (newState = {
                ...newState,
                grid: {
                  ...newState.grid,
                  [`${groupName}${order}`]: {
                    ...newState.grid[`${groupName}${order}`],
                    filename: value,
                  },
                },
              })
            : (newState = {
                ...newState,
                grid: {
                  ...newState.grid,
                  [`${groupName}${order}`]: {
                    ...newState.grid[`${groupName}${order}`],
                    url: value,
                  },
                },
              })
          : (newState = {
              ...newState,
              grid: {
                ...newState.grid,
                [`${groupName}${order}`]: {
                  ...newState.grid[`${groupName}${order}`],
                  isVideo: element.checked,
                },
              },
            })
        break
      case GroupName.feature:
        newState = {
          ...newState,
          featureSlides: newState.featureSlides.map((feature, index) => {
            if (index === parseInt(order) - 1)
              return {
                ...feature,
                [inputKey]: value,
              }
            return feature
          }),
        }
        break
      case GroupName.subtitle:
      case GroupName.fit:
      case GroupName.sizing:
        newState = {
          ...newState,
          [groupName]: value,
        }
        break
      default:
        throw Error('Unknown element')
    }
  }

  return newState
}

export {
  createCtx,
  getKebabCase,
  createUniqId,
  splidId,
  capitalizedWord,
  useTextField,
  handleSubmitData,
}
