import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const INCREASE_QTY = 'INCREASE_QTY'
const DECREASE_QTY = 'DECREASE_QTY'
const GET_GUEST_CART = 'GET_GUEST_CART'
const CLEAR_CART = 'CLEAR_CART'

/**
 * INITIAL STATE
 */
const initialCart = {}
const initialTotal = 0

/**
 * ACTION CREATORS
 */

export const getCart = cart => ({
  type: GET_CART,
  cart
})

export const clearCart = () => ({
  type: GET_CART,
  cart: {}
})

export const addToCart = bracelet => ({
  type: ADD_TO_CART,
  bracelet
})
export const removeFromCart = bracelet => ({
  type: REMOVE_FROM_CART,
  bracelet
})

export const incrementQty = bracelet => ({
  type: INCREASE_QTY,
  bracelet
})

export const decrementQty = bracelet => ({
  type: DECREASE_QTY,
  bracelet
})

/**
 * THUNK CREATORS
 */

export const getCartThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart')
    dispatch(getCart(data))
  } catch (error) {
    console.error('there was an error in the getCartThunk', error)
  }
}
export const addToCartThunk = id => async dispatch => {
  try {
    const {data} = await axios.post(`/api/cart/${id}/add`)
    dispatch(addToCart(data))
  } catch (error) {
    console.error('there was an error in the addToCartThunk', error)
  }
}

export const incrementQtyThunk = id => async dispatch => {
  try {
    const {data} = await axios.post(`/api/cart/${id}/add`)
    dispatch(incrementQty(data))
  } catch (error) {
    console.error('there was an error in the incrementToCartThunk', error)
  }
}
export const removeFromCartThunk = id => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/cart/${id}/delete`)
    dispatch(removeFromCart(data))
  } catch (error) {
    console.error('there was an error in the decrementQtyTHunk', error)
  }
}

export const decrementQtyThunk = id => async dispatch => {
  try {
    const {data} = await axios.put(`/api/cart/${id}/decrease`)
    if (data.qty === 0) {
      dispatch(removeFromCartThunk(id))
    } else dispatch(decrementQty(data))
  } catch (error) {
    console.error('there was an error in the decrementQtyTHunk', error)
  }
}

export const userCart = (state = initialCart, action) => {
  switch (action.type) {
    case GET_CART:
      let cart = {}
      for (let i = 0; i < action.cart.length; i++) {
        let currItem = action.cart[i]
        cart[currItem.braceletId] = currItem.qty
      }
      return cart

    case ADD_TO_CART:
      let bracelet = {
        [action.bracelet.braceletId]: action.bracelet.qty
      }

      return {...state, ...bracelet}

    case INCREASE_QTY:
      return {
        ...state,
        [action.bracelet.braceletId]: action.bracelet.qty++
      }

    case DECREASE_QTY:
      return {
        ...state,
        [action.bracelet.braceletId]: action.bracelet.qty--
      }

    case REMOVE_FROM_CART:
      let newState = {...state}
      delete newState[action.bracelet.braceletId]
      return newState

    default:
      return state
  }
}

export const userTotal = (state = initialTotal, action) => {
  switch (action.type) {
    case GET_CART:
      return ''

    case ADD_TO_CART:
      return state + Number(action.bracelet.price)

    case INCREASE_QTY:
      return state + Number(action.bracelet.price)

    case DECREASE_QTY:
      if (state - Number(action.bracelet.price) <= 0) {
        return 0
      } else return state - Number(action.bracelet.price)

    case REMOVE_FROM_CART:
      return state - Number(action.bracelet.price * action.bracelet.qty)

    default:
      return state
  }
}
