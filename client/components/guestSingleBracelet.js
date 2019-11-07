import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleBraceletThunk} from '../store/bracelet'
import {addToGCart} from '../store/guestcartstore'

class GuestSingleBracelet extends Component {
  componentDidMount() {
    const id = Number(this.props.match.params.id)
    this.props.getSingleBracelet(id)
  }

  increment(bracelet) {
    let cart = localStorage.getItem('gcart')
    cart = cart ? JSON.parse(cart) : {}
    if (!cart[bracelet.id]) {
      cart[bracelet.id] = 0
    }
    cart[bracelet.id] = cart[bracelet.id] + 1
    localStorage.setItem('gcart', JSON.stringify(cart))
    console.log(bracelet.id)
    this.props.addToCart(bracelet.id)
  }

  // there is an issue where when you navigate between bracelets the previous bracelet loads for a millisecond before changing. Thinking we can use componentWillUpdate or componentWillReceiveProps or something like that

  render() {
    let bracelet = this.props.bracelet[0]

    if (!bracelet || this.props.bracelet.length > 1)
      return <div>Loading...</div>
    else
      return (
        <div>
          <h1>Style: {bracelet.style}</h1>
          <h1>Material: {bracelet.material}</h1>
          <h1>Color: {bracelet.color}</h1>
          <h1>Price: {bracelet.price / 100}</h1>
          <button type="submit" onClick={() => this.increment(bracelet)}>
            Add to cart
          </button>
          <img src={bracelet.image} />
        </div>
      )
  }
}

const mapDispatchToProps = dispatch => ({
  getSingleBracelet: id => dispatch(getSingleBraceletThunk(id)),
  addToCart: bracelet => dispatch(addToGCart(bracelet))
})

const mapStateToProps = state => {
  return {
    bracelet: state.bracelets
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(GuestSingleBracelet)
