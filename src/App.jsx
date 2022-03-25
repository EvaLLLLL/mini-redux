import { createContext, useContext, useState } from 'react'

const Context = createContext(null)

export default function App() {
  const [appState, setAppState] = useState({ val: '' })
  return (
    <Context.Provider value={{ appState, setAppState }}>
      <Wrapper />
      <Section2 />
    </Context.Provider>
  )
}

const reducer = (state, { type, payload }) => {
  if (type === 'updateSection2') {
    return { ...state, ...payload }
  } else {
    return state
  }
}

const Wrapper = () => {
  const { appState, setAppState } = useContext(Context)

  const dispatch = action => {
    setAppState(reducer(appState, action))
  }

  return <Section1 dispatch={dispatch} />
}

const Section1 = ({ dispatch }) => {
  return (
    <section>
      <div>section1</div>
      <div>
        <input
          placeholder="update section2"
          onChange={e =>
            dispatch({
              type: 'updateSection2',
              payload: {
                val: e.target.value,
              },
            })
          }
        />
      </div>
    </section>
  )
}

const Section2 = () => {
  const { appState } = useContext(Context)
  return (
    <section>
      <div>section2: {appState.val}</div>
    </section>
  )
}
