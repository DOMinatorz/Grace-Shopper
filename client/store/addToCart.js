import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

/**
 * INITIAL STATE
 */
const initialCart = []
const initialTotal = 0

/**
 * ACTION CREATORS
 */

export const addToCart = bracelet => ({
  type: ADD_TO_CART,
  bracelet
})
export const removeFromCart = bracelet => ({
  type: REMOVE_FROM_CART,
  bracelet
})

/**
 * THUNK CREATORS
 */

// export const addBraceletToCartThunk = id => async dispatch => {
//   try {
//     const {data} = await axios.get(`/api/bracelets/${id}`)
//     dispatch(addToCart(data))
//   } catch (error) {
//     console.log('there was an error in the addBraceletToCartThunk')
//   }
// }

// export const removeBraceletFromCartThunk = id => async dispatch => {
//   try {
//     const {data} = await axios.get(`/api/bracelets/${id}`)
//     dispatch(removeFromCart(data))
//   } catch (error) {
//     console.log('there was an error in the removeBraceletFromCartThunk')
//   }
// }

/**
 * REDUCER
 */

// the below assumes that cart is an array as opposed to an object
// the benefit of array is to keep the order that the bracelets were added to the cart
// the benefit of switching to an object would be to avoid having to find the index of an existing item if the value is going to get incremented

export const cart = (state = initialCart, action) => {
  let idx = null
  switch (action.type) {
    case ADD_TO_CART:
      state.forEach((bracelet, index) => {
        if (bracelet.id === action.bracelet.id) {
          idx = index
        }
      })

      if (idx) {
        ++state[idx].qty
        return state
      } else return [...state, action.bracelet]

    case REMOVE_FROM_CART:
      state.filter(bracelet => action.bracelet.id !== bracelet.id)
      return state

    default:
      return state
  }
}

export const total = (state = initialTotal, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return state + Number(action.bracelet.price)

    case REMOVE_FROM_CART:
      return state - Number(action.bracelet.price)

    default:
      return state
  }
}
