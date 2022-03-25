import { createContext, useContext, useEffect, useState } from 'react'
const Context = createContext(null)

export const store = {
  state: { val: '' },
  listeners: [],
  setState: newState => {
    store.state = newState
    store.listeners.map(fn => fn(store.state))
  },
  dispatch: action => {
    store.setState(reducer(store.state, action))
  },
  subscribe(fn) {
    store.listeners.push(fn)
    return () => {
      const index = store.listeners.indexOf(fn)
      store.listeners.splice(index, 1)
    }
  },
}

export const Provider = ({ children, store }) => {
  return <Context.Provider value={store}>{children}</Context.Provider>
}

const reducer = (state, { type, payload }) => {
  if (type === 'updateSection2') {
    return { ...state, ...payload }
  } else {
    return state
  }
}

export const connect = Component => {
  return props => {
    const [, update] = useState({})
    useEffect(() => {
      store.subscribe(() => {
        update({})
      })
    }, [store.state])

    return (
      <Component dispatch={store.dispatch} state={store.state} {...props} />
    )
  }
}
