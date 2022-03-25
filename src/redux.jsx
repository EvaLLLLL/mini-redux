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

let prevDispatch = store.dispatch
store.dispatch = action => {
  if (action instanceof Function) {
    action(store.dispatch)
  } else if (action.payload instanceof Promise) {
    action.payload.then(data => {
      store.dispatch({
        ...action,
        payload: data,
      })
    })
  } else {
    prevDispatch(action)
  }
}

export const createStore = (_reducer, initState) => {
  reducer = _reducer
  state = initState

  return store
}

export const Provider = ({ children, store }) => {
  return <Context.Provider value={store}>{children}</Context.Provider>
}

export const connect = (selector, dispatcherSelector) => Component => {
  return props => {
    const [, update] = useState({})
    const newData = selector ? selector(state) : state
    const dispatchers = dispatcherSelector
      ? dispatcherSelector(store.dispatch)
      : { dispatch: store.dispatch }

    useEffect(() => {
      store.subscribe(() => {
        update({})
      })
    }, [state])

    return <Component {...dispatchers} {...newData} {...props} />
  }
}
