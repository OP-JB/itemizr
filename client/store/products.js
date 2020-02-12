import {createStore, applyMiddleware} from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import history from '../history'
import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

const gotProducts = product => ({
  type: GET_PRODUCTS,
  product
})

const addedProduct = newProduct => ({
  type: ADD_PRODUCT,
  newProduct
})

const removedProduct = id => ({
  type: REMOVE_PRODUCT,
  id
})

const updatedProduct = (id, product) => ({
  type: UPDATE_PRODUCT,
  id,
  product
})

export const getProducts = listId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/lists/${listId}/product`)
    dispatch(gotProducts(data))
  } catch(err) {
    console.error(err)
  }
}

export const addProduct = newProduct => dispatch => {
  dispatch(addedProduct(newProduct))
}

export const removeProduct = id => dispatch => {
  try {
    dispatch(removedProduct(id))
  } catch(err) {
    console.error(err)
  }
}

export const updateProduct = (id, product) => dispatch => {
  try {
    dispatch(updatedProduct(id, product))
  } catch(err) {
    console.error(err)
  }
}

export const saveProducts = (listId, product) => async dispatch => {

  try {
    const {data} = await axios.post(`/api/product`, product)
    if(data) history.push(`/lists/${listId}`)
  } catch(err) {
    console.error(err)
  }
}

const initialState = []

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.product
    case ADD_PRODUCT:
      return [...state, action.newProduct]
    case REMOVE_PRODUCT:
      return state.filter(eachProduct => eachProduct.id !== action.id)
    case UPDATE_PRODUCT:
      return state.map(product => {
        if(product.id === action.id) {
          product = Object.assign(product, action.product)
        }
        return product
      })
    default:
      return state
  }
}

export default productReducer
