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
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export { createCtx, getKebabCase, createUniqId, splidId, capitalizedWord }
