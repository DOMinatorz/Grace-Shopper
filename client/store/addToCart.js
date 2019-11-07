import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const INCREASE_QTY = 'INCREASE_QTY'
const DECREASE_QTY = 'DECREASE_QTY'
const GET_GUEST_CART = 'GET_GUEST_CART'

/**
 * INITIAL STATE
 */
const initialCart = []
const initialTotal = 0

//cart for guests
localStorage.setItem('gcart', JSON.stringify({g: 1}))
console.log(localStorage.getItem('gcart').g)

/**
 * ACTION CREATORS
 */

export const getGuestCart = () => ({
  type: GET_GUEST_CART,
  cart: localStorage.getItem('gcart')
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

// the below assumes that cart is an array as opposed to an object
// the benefit of array is to keep the order that the bracelets were added to the cart
// the benefit of switching to an object would be to avoid having to find the index of an existing item if the value is going to get incremented

export const cart = (state = initialCart, action) => {
  let idx = null
  switch (action.type) {
    case GET_GUEST_CART:
      return action.cart
    case ADD_TO_CART:
      state.forEach((bracelet, index) => {
        if (bracelet.id === action.bracelet.id) {
          idx = index
        }
      })

      if (idx || idx === 0) {
        state[idx].qty = state[idx].qty + 1
        return state
      } else {
        action.bracelet.qty++
        return [...state, action.bracelet]
      }
    case INCREASE_QTY:
      action.bracelet.qty++
      return state

    case DECREASE_QTY:
      if (action.bracelet.qty === 1) {
        return state.filter(bracelet => bracelet !== action.bracelet)
      } else action.bracelet.qty--
      return state

    case REMOVE_FROM_CART:
      return state.filter(bracelet => action.bracelet.id !== bracelet.id)

    default:
      return state
  }
}

export const total = (state = initialTotal, action) => {
  switch (action.type) {
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
