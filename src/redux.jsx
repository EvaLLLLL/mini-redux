import { createContext, useContext } from 'react'

export const Context = createContext(null)

const reducer = (state, { type, payload }) => {
  if (type === 'updateSection2') {
    return { ...state, ...payload }
  } else {
    return state
  }
}

export const connect = Component => {
  return () => {
    const { appState, setAppState } = useContext(Context)

    const dispatch = action => {
      setAppState(reducer(appState, action))
    }

    return <Component dispatch={dispatch} state={appState} />
  }
}
