import { createContext, useContext, useEffect, useState } from 'react'
const Context = createContext(null)

let reducer = undefined
let state = undefined
let listeners = []
const setState = newState => {
  state = newState
  listeners.map(fn => fn(state))
}

export const store = {
  getState: () => state,
  dispatch: action => {
    setState(reducer(state, action))
  },
  subscribe(fn) {
    listeners.push(fn)
    return () => {
      const index = listeners.indexOf(fn)
      listeners.splice(index, 1)
    }
  },
}

export const createStore = (_reducer, initState) => {
  reducer = _reducer
  state = initState

  return store
}

export const Provider = ({ children, store }) => {
  return <Context.Provider value={store}>{children}</Context.Provider>
}

export const connect = selector => Component => {
  return props => {
    const [, update] = useState({})
    const newData = selector ? selector(state) : state
    useEffect(() => {
      store.subscribe(() => {
        update({})
      })
    }, [state])

    return <Component dispatch={store.dispatch} {...newData} {...props} />
  }
}
