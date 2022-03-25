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

const Section1 = connect(null, dispatch => ({
  updateSection2: payload => dispatch({ type: 'updateSection2', payload }),
}))(({ updateSection2 }) => {
  return (
    <section>
      <div>section1</div>
      <div>
        <input
          placeholder="update section2"
          onChange={e => updateSection2({ val: e.target.value })}
        />
      </div>
    </section>
  )
})

const Section2 = connect(state => state)(({ val }) => {
  return (
    <section>
      <div>section2: {val}</div>
    </section>
  )
})
