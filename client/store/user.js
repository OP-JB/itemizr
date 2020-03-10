import {createStore, applyMiddleware} from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'
import history from '../history'

const initialState = {}

const GET_USER = 'GET_USER'

const gotMe = user => ({
  type: GET_USER,
  user
})

export const getMe = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users/user')
    const {user} = dispatch(gotMe(data))
    return user
  } catch(err) {
    console.error(err)
  }
}

export const signup = formData => async dispatch => {
  try {
    const {data} = await axios.post('/api/users/signup', formData)
    const {user} = dispatch(gotMe(data))
    return user
  } catch(err) {
    console.error(err)
  }
}

export const login = formData => async dispatch => {
  try {
    const {data} = await axios.put('/api/users/login', formData)
    const {user} = dispatch(gotMe(data))
    return user
  } catch(err) {
    console.error(err)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.delete('/api/users/logout')
    dispatch(gotMe(initialState))
    history.push('/login')
  } catch(err) {
    console.error(err)
  }
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user
    default:
      return state
  }
}

export default userReducer
