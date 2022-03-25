import React, { useContext, useEffect, useState } from 'react'
let state = undefined
let reducer = undefined
let listeners = []
const setState = newState => {
  state = newState
  listeners.map(fn => fn(state))
}

const store = {
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

let dispatch = store.dispatch

const preDispatch = dispatch

dispatch = action => {
  if (action instanceof Function) {
    action(dispatch)
  } else {
    preDispatch(action)
  }
}

const prevDispatch2 = dispatch

dispatch = action => {
  if (action.payload instanceof Promise) {
    action.payload.then(data => {
      dispatch({ ...action, payload: data })
    })
  } else {
    prevDispatch2(action)
  }
}

const Context = React.createContext(null)

export const Provider = ({ children, store }) => {
  return <Context.Provider value={store}>{children}</Context.Provider>
}

export const createStore = (_reducer, initState) => {
  state = initState
  reducer = _reducer

  return store
}

const isChanged = (oldState, newState) => {
  if (Object.keys(oldState).length !== Object.keys(newState).length)
    return false

  let changed = false
  for (let key in oldState) {
    if (oldState[key] !== newState[key]) {
      changed = true
    }
  }

  return changed
}

export const connect = (selector, dispatchSelector) => Component => {
  return props => {
    const [, update] = useState({})
    const data = selector ? selector(state) : { state }
    const dispatchers = dispatchSelector
      ? dispatchSelector(dispatch)
      : { dispatch }

    useEffect(
      () =>
        store.subscribe(() => {
          const newData = selector ? selector(state) : { state }
          if (isChanged(data, newData)) {
            update({})
          }
        }),

      [selector],
    )

    return <Component {...props} {...data} {...dispatchers} />
  }
}
