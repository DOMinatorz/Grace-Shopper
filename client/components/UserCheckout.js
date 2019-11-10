import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunk} from '../store/addToCart'
import {getAllBraceletsThunk} from '../store/bracelet'

export class UserCheckout extends Component {
  componentDidMount() {
    this.props.getAllBracelets()
    this.props.getCart()
    console.log('hello')
  }
  render() {
    if (!Object.keys(this.props.cart).length) {
      return <div>Your Cart is Empty!</div>
    } else {
      console.log('THE CART------>', this.props.cart)
      let filteredBracelets = this.props.bracelets.filter(bracelet => {
        return this.props.cart.hasOwnProperty(bracelet.id)
      })
      let orderTotal = 0
      for (let i = 0; i < filteredBracelets.length; i++) {
        orderTotal =
          filteredBracelets[i].price /
            100 *
            this.props.cart[filteredBracelets[i].id] +
          orderTotal
      }

      return (
        <div>
          <h1>Your cart!</h1>
          {filteredBracelets.map(bracelet => {
            return (
              <div key={bracelet.id}>
                <h3>
                  Style & Color {bracelet.style}, {bracelet.color}
                </h3>
                <h3>Qty: {this.props.cart[bracelet.id]}</h3>
                <h3>
                  Single Item Total: ${bracelet.price *
                    this.props.cart[bracelet.id] /
                    100}
                </h3>
                <br />
              </div>
            )
          })}
          <h2> Your order's total is: ${orderTotal}</h2>
          <button type="submit">Submit Order</button>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  bracelets: state.bracelets,
  cart: state.userCart,
  total: state.userTotal
})

const mapDispatchToProps = dispatch => ({
  getAllBracelets: () => dispatch(getAllBraceletsThunk()),
  getCart: () => dispatch(getCartThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserCheckout)
