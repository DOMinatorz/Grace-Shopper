import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getCartThunk,
  addToCartThunk,
  removeFromCartThunk,
  decrementQtyThunk,
  incrementQtyThunk
} from '../store/addToCart'
import {getAllBraceletsThunk} from '../store/bracelet'

export class Cart extends Component {
  componentDidMount() {
    // if the user is logged in, we do this below
    this.props.getAllBracelets()
    this.props.getCart()
  }

  render() {
    if (!Object.keys(this.props.cart).length)
      return <div>Your Cart is Empty</div>
    else {
      let filteredBracelets = this.props.bracelets.filter(bracelet => {
        return this.props.cart.hasOwnProperty(bracelet.id)
      })

      filteredBracelets.forEach(bracelet => {
        bracelet.quantity = this.props.cart[bracelet.id]
      })
      return (
        <div>
          <h1>Your cart!</h1>
          {filteredBracelets.map(bracelet => {
            return (
              <div key={bracelet.id}>
                <h3>Bracelet id: {bracelet.id}</h3>
                <h3>Style: {bracelet.style}</h3>
                <h3>Color: {bracelet.color}</h3>
                <h3>Qty: {bracelet.quantity}</h3>
                <h3>Total: ${bracelet.price * bracelet.quantity / 100}</h3>

                <button
                  type="submit"
                  onClick={() => this.props.incrementQty(bracelet.id)}
                >
                  +
                </button>

                <button
                  type="submit"
                  onClick={() => this.props.decrementQty(bracelet.id)}
                >
                  -
                </button>
                <br />
                <button
                  type="submit"
                  onClick={() => this.props.removeFromCart(bracelet.id)}
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
}

const mapStateToProps = state =>
  // we should do some login in here to be like, if user is logged in, then cart is state.cart, otherwise, cart is state.userCart

  ({
    bracelets: state.bracelets,
    cart: state.userCart,
    total: state.userTotal
  })

const mapDispatchToProps = dispatch => ({
  getAllBracelets: () => dispatch(getAllBraceletsThunk()),
  getCart: () => dispatch(getCartThunk()),
  removeFromCart: id => dispatch(removeFromCartThunk(id)),
  incrementQty: id => dispatch(incrementQtyThunk(id)),
  decrementQty: id => dispatch(decrementQtyThunk(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
