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

/**
 * INITIAL STATE
 */
const initialCart = {}
const initialTotal = 0

/**
 * ACTION CREATORS
 */

// I would like to update thunks to only take a braceletId instead of the whole bracelet but concerned that will break the work that milo/gerard are doing for non-logged in users

export const getCart = cart => ({
  type: GET_CART,
  cart
})

export const addToCart = bracelet => ({
  // when a user is logged in, we are receiving 'item' this is going to be a record of the item added that has a braceletId property which we could use to look up info on the bracelet in the database and send to the front end. i.e. send the whole bracelet as opposed to just sending this weird item object

  // just updated the API route to send back the bracelet object instead of the 'item' in the cart_items table

  // down the line instead of passing bracelet or whole item , just pass the bracelet id qty
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
    console.log('there was an error in the getCartThunk')
  }
}
// do i have to add another argument to my post request
export const addToCartThunk = id => async dispatch => {
  try {
    // do i have to add another argument to my post request
    const {data} = await axios.post(`/api/cart/${id}/add`)
    dispatch(addToCart(data))
  } catch (error) {
    console.log('there was an error in the addToCartThunk')
  }
}

export const incrementQtyThunk = id => async dispatch => {
  try {
    // do i have to add another argument to my post request
    const {data} = await axios.post(`/api/cart/${id}/add`)
    dispatch(incrementQty(data))
  } catch (error) {
    console.log('there was an error in the incrementToCartThunk')
  }
}

export const decrementQtyThunk = id => async dispatch => {
  try {
    // do i have to add another argument to my post request
    const {data} = await axios.put(`/api/cart/${id}/decrease`)
    dispatch(decrementQty(data))
  } catch (error) {
    console.log('there was an error in the decrementQtyTHunk')
  }
}
export const removeFromCartThunk = id => async dispatch => {
  try {
    // do i have to add another argument to my post request
    const {data} = await axios.delete(`/api/cart/${id}/delete`)
    dispatch(removeFromCart(data))
  } catch (error) {
    console.log('there was an error in the decrementQtyTHunk')
  }
}

// the code below is the reducer that I think the guest cart is still using so I'm not going to delete, refactoring the reducer for loggedin Users

// export const cart = (state = initialCart, action) => {
//   let idx = null
//   switch (action.type) {
//     case ADD_TO_CART:
//       state.forEach((bracelet, index) => {
//         if (bracelet.id === action.bracelet.id) {
//           idx = index
//         }
//       })

//       if (idx || idx === 0) {
//         state[idx].qty = state[idx].qty + 1
//         return state
//       } else {
//         action.bracelet.qty++
//         return [...state, action.bracelet]
//       }
//     case INCREASE_QTY:
//       action.bracelet.qty++
//       return state

//     case DECREASE_QTY:
//       if (action.bracelet.qty === 1) {
//         return state.filter(bracelet => bracelet !== action.bracelet)
//       } else action.bracelet.qty--
//       return state

//     case REMOVE_FROM_CART:
//       return state.filter(bracelet => action.bracelet.id !== bracelet.id)

//     default:
//       return state
//   }
// }

export const userCart = (state = initialCart, action) => {
  // let idx = null

  switch (action.type) {
    case GET_CART:
      let cart = {}
      for (let i = 0; i < action.cart.length; i++) {
        let currItem = action.cart[i]
        cart[currItem.braceletId] = currItem.qty
      }
      return cart

    case ADD_TO_CART:
      return action.bracelet

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
      console.log('this is state', state)
      delete state[action.bracelet.braceletId]
      console.log('this is new state', state)
      return state

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

// the code below is the reducer that I think the guest cart is still using so I'm not going to delete, refactoring the reducer for loggedin Users

// export const total = (state = initialTotal, action) => {
//   switch (action.type) {
//     case ADD_TO_CART:
//       return state + Number(action.bracelet.price)

//     case INCREASE_QTY:
//       return state + Number(action.bracelet.price)

//     case DECREASE_QTY:
//       if (state - Number(action.bracelet.price) <= 0) {
//         return 0
//       } else return state - Number(action.bracelet.price)

//     case REMOVE_FROM_CART:
//       return state - Number(action.bracelet.price * action.bracelet.qty)

//     default:
//       return state
//   }
// }
