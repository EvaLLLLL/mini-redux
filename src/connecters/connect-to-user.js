import { connect } from '../redux'

const userSelector = state => ({ user: state.user })
const userDispatcher = dispatch => ({
  updateUser: attrs => dispatch({ type: 'updateUser', payload: attrs }),
})

export const connectToUser = connect(userSelector, userDispatcher)
