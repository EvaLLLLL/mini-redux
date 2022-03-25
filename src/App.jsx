import React from 'react'
import { connect, createStore, Provider } from './redux.jsx'
import { connectToUser } from './connecters/connect-to-user'

const reducer = (state, { type, payload }) => {
  if (type === 'updateUser') {
    return {
      ...state,
      user: {
        ...state.user,
        ...payload,
      },
    }
  } else {
    return state
  }
}

const initState = {
  user: { name: 'hi', age: 99 },
  group: { name: 'this is a group' },
}

const store = createStore(reducer, initState)

const ajax = (n = 3) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ data: { name: `这是 ${n} 秒后` } })
    }, n * 1000)
  })
}

function App() {
  return (
    <Provider store={store}>
      <FirstChild />
      <SecondChild />
      <LastChild />
    </Provider>
  )
}

const FirstChild = () => (
  <section>
    大儿子
    <User />
  </section>
)

const SecondChild = () => (
  <section>
    二儿子
    <UserModifier />
  </section>
)

const LastChild = connect(state => ({
  group: state.group,
}))(({ group }) => (
  <section>
    幺儿子: <span>{group.name}</span>
  </section>
))

const User = connectToUser(({ user }) => {
  return <div>User:{user.name}</div>
})

const fetchUser = async dispatch => {
  const { data } = await ajax(2)
  dispatch({ type: 'updateUser', payload: data })
}

const fetchUserPromise = () => {
  return ajax(3).then(res => res.data)
}

const UserModifier = connect(
  null,
  null,
)(({ state, dispatch }) => {
  return (
    <div>
      <div>User: {state.user.name}</div>
      <button
        onClick={() => {
          dispatch(fetchUser)

          dispatch({
            type: 'updateUser',
            payload: fetchUserPromise(),
          })
        }}
      >
        async test
      </button>
    </div>
  )
})

export default App
