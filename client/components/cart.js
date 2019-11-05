import React, {Component} from 'react'
import {connect} from 'react-redux'
import {removeFromCart} from '../store/addToCart'

export class Cart extends Component {
  render() {
    console.log('this is props', this.props)
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
                <h3>Total: {bracelet.price * bracelet.qty}</h3>
                <button
                  type="submit"
                  onClick={() => this.props.removeFromCart(bracelet)}
                >
                  {' '}
                  decrease qty
                </button>
                <br />
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
  removeFromCart: bracelet => dispatch(removeFromCart(bracelet))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
