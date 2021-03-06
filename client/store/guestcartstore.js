import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_TO_GCART = 'ADD_TO_GCART'
const REMOVE_FROM_GCART = 'REMOVE_FROM_GCART'
const INCREASE_GQTY = 'INCREASE_GQTY'
const DECREASE_GQTY = 'DECREASE_GQTY'
const GET_GUEST_GCART = 'GET_GUEST_GCART'

/**
 * INITIAL STATE
 */
const initialGCart = {}
const initialTotal = 0

//cart for guests
if (!JSON.parse(localStorage.getItem('gcart'))) {
  localStorage.setItem('gcart', JSON.stringify({}))
}

/**
 * ACTION CREATORS
 */

export const getGuestCart = () => ({
  type: GET_GUEST_GCART,
  cart: JSON.parse(localStorage.getItem('gcart'))
})

export const addToGCart = braceletId => ({
  type: ADD_TO_GCART,
  braceletId
})
export const removeFromGCart = braceletId => ({
  type: REMOVE_FROM_GCART,
  braceletId
})

export const incrementGQty = braceletId => ({
  type: INCREASE_GQTY,
  braceletId
})

export const decrementGQty = braceletId => ({
  type: DECREASE_GQTY,
  braceletId
})

export const guestCart = (state = initialGCart, action) => {
  switch (action.type) {
    case GET_GUEST_GCART:
      return JSON.parse(localStorage.getItem('gcart'))
    case ADD_TO_GCART:
      return JSON.parse(localStorage.getItem('gcart'))
    case INCREASE_GQTY:
      return JSON.parse(localStorage.getItem('gcart'))
    case DECREASE_GQTY:
      return JSON.parse(localStorage.getItem('gcart'))
    case REMOVE_FROM_GCART:
      return JSON.parse(localStorage.getItem('gcart'))
    default:
      return state
  }
}

export const total = (state = initialTotal, action) => {
  switch (action.type) {
    case ADD_TO_GCART:
      return state + Number(action.bracelet.price)

    case INCREASE_GQTY:
      return state + Number(action.bracelet.price)

    case DECREASE_GQTY:
      if (state - Number(action.bracelet.price) <= 0) {
        return 0
      } else return state - Number(action.bracelet.price)

    case REMOVE_FROM_GCART:
      return state - Number(action.bracelet.price * action.bracelet.qty)

    default:
      return state
  }
}
