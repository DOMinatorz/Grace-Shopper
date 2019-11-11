import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllBraceletsThunk, guestCheckoutThunk} from '../store/bracelet'

export class GuestCheckout extends Component {
  componentDidMount() {
    this.props.getAllBracelets()
    console.log('hello')
  }
  checkout() {
    let gCart = JSON.parse(localStorage.getItem('gcart'))
    this.props.guestCheckoutThunk(gCart)
    localStorage.setItem('gcart', JSON.stringify({}))
    alert('Thank you for your purchase')
    this.props.history.push('/home')
  }

  render() {
    if (Object.keys(JSON.parse(localStorage.getItem('gcart'))).length === 0)
      return <div>Your Cart is Empty</div>
    else {
      let visibleCart = this.props.bracelets.filter(bracelet => {
        return Object.keys(JSON.parse(localStorage.getItem('gcart'))).includes(
          String(bracelet.id)
        )
      })
      let orderTotal = 0
      for (let i = 0; i < visibleCart.length; i++) {
        orderTotal =
          visibleCart[i].price /
            100 *
            JSON.parse(localStorage.getItem('gcart'))[visibleCart[i].id] +
          orderTotal
      }
      return (
        <div>
          <h1>Your cart!</h1>
          {visibleCart.map(bracelet => {
            return (
              <div key={bracelet.id}>
                <h3>
                  Style & Color {bracelet.style}, {bracelet.color}
                </h3>
                <h3>
                  Qty: {JSON.parse(localStorage.getItem('gcart'))[bracelet.id]}
                </h3>
                <h3>
                  Single Item Total: ${bracelet.price *
                    JSON.parse(localStorage.getItem('gcart'))[bracelet.id] /
                    100}
                </h3>
                <br />
              </div>
            )
          })}
          <h2> Your order's total is: ${orderTotal}</h2>
          <button type="submit" onClick={() => this.checkout()}>
            Submit Order
          </button>
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
  guestCheckoutThunk: cart => dispatch(guestCheckoutThunk(cart))
})

export default connect(mapStateToProps, mapDispatchToProps)(GuestCheckout)
