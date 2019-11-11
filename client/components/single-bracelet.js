import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleBraceletThunk} from '../store/bracelet'
import {
  addToCart,
  addToCartThunk,
  incrementQtyThunk,
  getCartThunk
} from '../store/addToCart'
import './single-bracelet.css'

class SingleBracelet extends Component {
  componentDidMount() {
    const id = Number(this.props.match.params.id)
    this.props.getCart()
    this.props.getSingleBracelet(id)
  }

  render() {
    let bracelet = this.props.bracelet[0]

    if (!bracelet || this.props.bracelet.length > 1)
      return <div>Loading...</div>
    else
      return (
        <div className="bracelet-page">
          <div className="container">
            <div className="item">
              <img id="single-bracelet-image" src={bracelet.image} />
            </div>
          </div>

          <div className="short-description">
            <span>Style: {bracelet.style}</span>
            <br />
            <span>Material: {bracelet.material}</span>
            <br />
            <span>Color: {bracelet.color}</span>
            <br />
            <span>Price: ${bracelet.price / 100}.00</span>
            <div>
              <a
                onClick={() => this.props.addToCart(bracelet.id)}
                className="addtocart"
              />
              <span className="qty">
                {this.props.cart === undefined
                  ? 0
                  : this.props.cart[bracelet.id]}
              </span>
            </div>
            <div className="description">{bracelet.description}</div>
          </div>
        </div>
      )
  }
}

const mapDispatchToProps = dispatch => ({
  getSingleBracelet: id => dispatch(getSingleBraceletThunk(id)),
  addToCart: id => dispatch(addToCartThunk(id)),
  incrementQty: id => dispatch(incrementQtyThunk(id)),
  getCart: () => dispatch(getCartThunk())
})

const mapStateToProps = state => {
  return {
    bracelet: state.bracelets,
    cart: state.userCart
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleBracelet)
