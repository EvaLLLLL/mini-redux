import { useState } from 'react'
import { connect, Context } from './redux'

export default function App() {
  const [appState, setAppState] = useState({ val: '' })
  return (
    <Context.Provider value={{ appState, setAppState }}>
      <Section1 />
      <Section2 />
    </Context.Provider>
  )
}

const Section1 = connect(({ dispatch }) => {
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
})

const Section2 = connect(({ state }) => {
  return (
    <section>
      <div>section2: {state.val}</div>
    </section>
  )
})
