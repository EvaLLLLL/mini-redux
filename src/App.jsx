import { connect, createStore, Provider } from './redux'

const reducer = (state, { type, payload }) => {
  if (type === 'updateSection2') {
    return { ...state, ...payload }
  } else {
    return state
  }
}

const store = createStore(reducer, { val: '' })

export default function App() {
  return (
    <Provider store={store}>
      <Section1 />
      <Section2 />
    </Provider>
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
