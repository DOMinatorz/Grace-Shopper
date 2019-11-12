import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import {bracelets} from './bracelet'

import {guestCart} from './guestcartstore'

import {cart, total, userCart, userTotal, userHistory} from './addToCart'

const reducer = combineReducers({
  user,
  bracelets,
  userCart,
  userTotal,
  guestCart,
  userHistory
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
