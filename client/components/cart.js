import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  getCartThunk,
  removeFromCartThunk,
  decrementQtyThunk,
  incrementQtyThunk
} from '../store/addToCart'
import {getAllBraceletsThunk} from '../store/bracelet'
import {Button} from 'react-bootstrap'

export class Cart extends Component {
  componentDidMount() {
    console.log(this.props)
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

      // filteredBracelets.forEach(bracelet => {
      //   bracelet.quantity = this.props.cart[bracelet.id]
      // })
      return (
        <div>
          <h1>Your cart! 🛒</h1>

          {filteredBracelets.map(bracelet => {
            return (
              <div key={bracelet.id}>
                <div id="single-bracelet-info">
                  <h3>Bracelet id: {bracelet.id}</h3>
                  <h3>Style: {bracelet.style}</h3>
                  <h3>Color: {bracelet.color}</h3>
                  <h3>Qty: {this.props.cart[bracelet.id]}</h3>
                  <h3>
                    Total: ${bracelet.price *
                      this.props.cart[bracelet.id] /
                      100}
                  </h3>

                  <Button
                    type="submit"
                    onClick={() => this.props.incrementQty(bracelet.id)}
                  >
                    +
                  </Button>

                  <Button
                    type="submit"
                    // onClick={() =>
                    //   this.props.cart[bracelet.id] === 1
                    //     ? this.props.removeFromCart(bracelet.id)
                    //     : this.props.decrementQty(bracelet.id)
                    // }
                    onClick={() => this.props.decrementQty(bracelet.id)}
                  >
                    -
                  </Button>
                  <br />
                  <Button
                    type="submit"
                    onClick={() => this.props.removeFromCart(bracelet.id)}
                  >
                    x
                  </Button>
                </div>
                <div id="single-bracelet-image">
                  <img src={bracelet.image} />
                </div>
              </div>
            )
          })}
          <Link to="/checkout">
            <button type="button">Go To Checkout</button>
          </Link>
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
