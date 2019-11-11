import axios from 'axios'
import history from '../history'
import {clearCart} from './addToCart'

/**
 * ACTION TYPES
 */
const GET_ALL_BRACELETS = 'GET_ALL_BRACELETS'
const GET_SINGLE_BRACELET = 'GET_SINGLE_BRACELET'

/**
 * INITIAL STATE
 */
const defaultBracelets = []

/**
 * ACTION CREATORS
 */

const getAllBracelets = bracelets => ({
  type: GET_ALL_BRACELETS,
  bracelets
})
const getSingleBracelet = bracelet => ({
  type: GET_SINGLE_BRACELET,
  bracelet
})

/**
 * THUNK CREATORS
 */

export const getAllBraceletsThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/bracelets')
    dispatch(getAllBracelets(data))
  } catch (error) {
    console.error('there was an error in the getAllBraceletsThunk', error)
  }
}

export const getSingleBraceletThunk = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/bracelets/${id}`)
    dispatch(getSingleBracelet(data))
  } catch (error) {
    console.error('there was an error in the getSingleBraceletThunk', error)
  }
}

export const checkoutThunk = () => async dispatch => {
  try {
    await axios.put(`/api/checkout`)
    dispatch(getAllBraceletsThunk)
  } catch (error) {
    console.error('there was an error in the checkoutThunk', error)
  }
}

export const guestCheckoutThunk = cart => async dispatch => {
  try {
    await axios.put(`/api/checkout/guest`, cart)
    dispatch(getAllBraceletsThunk)
  } catch (error) {
    console.error('there was an error in the checkoutThunk', error)
  }
}

/**
 * REDUCER
 */

export const bracelets = (state = defaultBracelets, action) => {
  switch (action.type) {
    case GET_ALL_BRACELETS:
      return action.bracelets
    case GET_SINGLE_BRACELET:
      return action.bracelet
    default:
      return state
  }
}
