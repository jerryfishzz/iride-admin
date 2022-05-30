import { InputUnitType } from 'components/InputUnit'
import { InputsType } from 'context/inputs'
import { createContext, useContext } from 'react'
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

function splidId(id: string) {
  return id.split('-')
}

function capitalizedWord(word: string) {
  return word.charAt(0).toUpperCase + word.slice(1)
}

enum GroupName {
  grid = 'grid',
  feature = 'feature',
}

function getInputUnitState(
  state: InputsType,
  groupName: GroupName,
  index: string,
  inputKey: string
) {
  switch (groupName) {
    case GroupName.grid:
      return {
        inputUnitState: state.grid[`grid${index}`],
        input: state.grid[`grid${index}`].isVideo
          ? state.grid[`grid${index}`].url
          : state.grid[`grid${index}`].filename,
      }
    case GroupName.feature:
      return {}
  }
}

export {
  createCtx,
  getKebabCase,
  createUniqId,
  splidId,
  getInputUnitState,
  GroupName,
  capitalizedWord,
}
