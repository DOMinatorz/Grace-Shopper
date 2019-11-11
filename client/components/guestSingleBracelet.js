import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleBraceletThunk} from '../store/bracelet'
import {addToGCart} from '../store/guestcartstore'
import './single-bracelet.css'

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
    this.props.addToGCart(bracelet.id)
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
                onClick={() => this.increment(bracelet)}
                className="addtocart"
                href={
                  // eslint-disable-next-line no-script-url
                  'javascript:if (typeof qty == "undefined") {qty = 0}; document.getElementsByClassName("qty")[0].innerHTML = ++qty;'
                }
              />
              <span className="qty">0</span>
            </div>
            <div className="description">{bracelet.description}</div>
          </div>
        </div>
      )
  }
}

const mapDispatchToProps = dispatch => ({
  getSingleBracelet: id => dispatch(getSingleBraceletThunk(id)),
  addToGCart: bracelet => dispatch(addToGCart(bracelet))
})

const mapStateToProps = state => {
  return {
    bracelet: state.bracelets
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(GuestSingleBracelet)
