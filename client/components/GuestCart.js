import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  removeFromGCart,
  incrementGQty,
  decrementGQty,
  getGuestCart
} from '../store/guestcartstore'
import {getAllBraceletsThunk} from '../store/bracelet'
import {Button} from 'react-bootstrap'
import './cart.css'

export class GuestCart extends Component {
  constructor() {
    super()
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
    this.remove = this.remove.bind(this)
  }
  componentDidMount() {
    this.props.getAllBracelets()
    this.props.guestCart()
  }
  increment(bracelet) {
    let cart = localStorage.getItem('gcart')
    cart = cart ? JSON.parse(cart) : {}
    if (!cart[bracelet.id]) {
      cart[bracelet.id] = 0
    }
    cart[bracelet.id] = cart[bracelet.id] + 1
    localStorage.setItem('gcart', JSON.stringify(cart))
    this.props.incrementQty(bracelet.id)
  }

  decrement(bracelet) {
    let cart = localStorage.getItem('gcart')
    cart = cart ? JSON.parse(cart) : {}
    if (!cart[bracelet.id]) {
      cart[bracelet.id] = 0
    }
    cart[bracelet.id] = cart[bracelet.id] - 1
    if (cart[bracelet.id] < 1) {
      delete cart[bracelet.id]
    }
    localStorage.setItem('gcart', JSON.stringify(cart))
    this.props.decrementQty(bracelet.id)
  }

  remove(bracelet) {
    let cart = localStorage.getItem('gcart')
    cart = cart ? JSON.parse(cart) : {}
    delete cart[bracelet.id]
    localStorage.setItem('gcart', JSON.stringify(cart))
    this.props.removeFromCart(bracelet.id)
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
      return (
        <div>
          <h1>Your cart!</h1>
          {visibleCart.map(bracelet => {
            return (
              <div id="cart-bracelet" key={bracelet.id}>
                <div id="single-bracelet-image-cart">
                  <img src={bracelet.image} />
                </div>
                <div id="single-bracelet-info">
                  <h3>Color: {bracelet.color}</h3>
                  <h3>Material: {bracelet.material}</h3>
                  <h3>Style: {bracelet.style}</h3>
                  <h3>
                    Qty:{' '}
                    {JSON.parse(localStorage.getItem('gcart'))[bracelet.id]}
                  </h3>
                  <h3>
                    Total:{' '}
                    {bracelet.price /
                      100 *
                      JSON.parse(localStorage.getItem('gcart'))[bracelet.id]}
                  </h3>

                  <Button
                    type="submit"
                    onClick={() => this.increment(bracelet)}
                  >
                    +
                  </Button>

                  <Button
                    type="submit"
                    onClick={() => this.decrement(bracelet)}
                  >
                    -
                  </Button>

                  <Button type="submit" onClick={() => this.remove(bracelet)}>
                    {' '}
                    X
                  </Button>
                  <hr />
                </div>
              </div>
            )
          })}
          <Link to="/guestcheckout">
            <button type="button" className="checkout">
              Go To Checkout
            </button>
          </Link>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  gcart: state.guestCart,
  bracelets: state.bracelets,
  total: state.total
})

const mapDispatchToProps = dispatch => ({
  removeFromCart: braceletid => dispatch(removeFromGCart(braceletid)),
  incrementQty: braceletid => dispatch(incrementGQty(braceletid)),
  decrementQty: braceletid => dispatch(decrementGQty(braceletid)),
  guestCart: () => dispatch(getGuestCart()),
  getAllBracelets: () => dispatch(getAllBraceletsThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(GuestCart)
