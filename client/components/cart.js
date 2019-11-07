import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getCartThunk,
  addToCartThunk,
  removeFromCart,
  incrementQty,
  decrementQty
} from '../store/addToCart'
import {getAllBraceletsThunk} from '../store/bracelet'

export class Cart extends Component {
  componentDidMount() {
    // if the user is logged in, we do this below
    this.props.getAllBracelets()
    this.props.getCart()
  }

  render() {
    if (this.props.cart.length === 0) return <div>Your Cart is Empty</div>
    else {
      let filteredBracelets = this.props.bracelets.filter(bracelet => {
        return this.props.cart.hasOwnProperty(bracelet.id)
      })
      console.log('this is filteredBtrc', filteredBracelets)

      filteredBracelets.forEach(bracelet => {
        bracelet.quantity = this.props.cart[bracelet.id]
      })
      console.log('this is new filteredBrc', filteredBracelets)
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
                <h3>Total: {bracelet.price * bracelet.quantity}</h3>

                <button
                  type="submit"
                  onClick={() => this.props.incrementQty(bracelet.id)}
                >
                  +
                </button>

                <button
                  type="submit"
                  onClick={() => this.props.decrementQty(bracelet)}
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
  removeFromCart: bracelet => dispatch(removeFromCart(bracelet)),
  incrementQty: id => dispatch(addToCartThunk(id)),
  decrementQty: bracelet => dispatch(decrementQty(bracelet))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
