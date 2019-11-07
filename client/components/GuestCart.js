import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  removeFromCart,
  incrementQty,
  decrementQty,
  getGuestCart
} from '../store/addToCart'

export class GuestCart extends Component {
  constructor() {
    super()
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
    this.remove = this.remove.bind(this)
  }
  componentDidMount() {
    guestCart()
  }
  increment(bracelet) {
    let cart = localStorage.getItem('gcart')
    cart = cart ? JSON.parse(cart) : {}
    if (!cart[bracelet.id]) {
      cart[bracelet.id] = 0
    }
    cart[bracelet.id] = cart[bracelet.id] + 1
    localStorage.setItem('gcart', JSON.stringify(cart))
    incrementQty(bracelet.id, cart[bracelet.id])
  }

  decrement(bracelet) {
    let cart = localStorage.getItem(gcart)
    cart = cart ? JSON.parse(cart) : {}
    if (!cart[bracelet.id]) {
      cart[bracelet.id] = 0
    }
    cart[bracelet.id] = cart[bracelet.id] - 1
    localStorage.setItem('gcart', JSON.stringify(cart))
    decrementQty(bracelet.id, cart[bracelet.id])
  }

  remove(bracelet) {
    let cart = localStorage.getItem(gcart)
    cart = cart ? JSON.parse(cart) : {}
    delete cart[bracelet.id]
    localStorage.setItem('gcart', JSON.stringify(cart))
    removeFromCart(bracelet.id)
  }

  render() {
    if (this.props.cart.length === 0) return <div>Your Cart is Empty</div>
    else
      return (
        <div>
          <h1>Your cart!</h1>
          {this.props.cart.map(bracelet => {
            return (
              <div key={bracelet.id}>
                <h3>Bracelet id: {bracelet.id}</h3>
                <h3>Style: {bracelet.style}</h3>
                <h3>Color: {bracelet.color}</h3>
                <h3>Qty: {bracelet.qty}</h3>
                <h3>Total: {bracelet.price * bracelet.qty}</h3>

                <button type="submit" onClick={() => this.increment(bracelet)}>
                  +
                </button>

                <button
                  type="submit"
                  onClick={() => this.props.decrement(bracelet)}
                >
                  -
                </button>

                <br />

                <button
                  type="submit"
                  onClick={() => this.props.removeFromCart(bracelet)}
                >
                  {' '}
                  X
                </button>
              </div>
            )
          })}
        </div>
      )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  total: state.total
})

const mapDispatchToProps = dispatch => ({
  removeFromCart: bracelet => dispatch(removeFromCart(bracelet)),
  incrementQty: bracelet => dispatch(incrementQty(bracelet)),
  decrementQty: bracelet => dispatch(decrementQty(bracelet)),
  guestCart: () => dispatch(getGuestCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(GuestCart)
