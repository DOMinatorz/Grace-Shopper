import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleBraceletThunk} from '../store/bracelet'
import {addToCart, addToCartThunk} from '../store/addToCart'
import './single-bracelet.css'

class SingleBracelet extends Component {
  componentDidMount() {
    const id = Number(this.props.match.params.id)
    this.props.getSingleBracelet(id)
  }

  // there is an issue where when you navigate between bracelets the previous bracelet loads for a millisecond before changing. Thinking we can use componentWillUpdate or componentWillReceiveProps or something like that

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
                href={
                  // eslint-disable-next-line no-script-url
                  'javascript:if (typeof qty == "undefined") {qty = 0}; document.getElementsByClassName("qty")[0].innerHTML = ++qty;'
                }
              />
              <span className="qty">0</span>
            </div>
            <div className="description">{bracelet.description}</div>
          </div>

          {/* <div className="container">
            <div className="item">
              <img id="single-bracelet" src={bracelet.image} />
            </div>
          </div> */}

          {/* <div className="hidden">
          Hi, I'm hidden. Notice that all of my styling is hidden as well, and that I still take up space, even though you can't see me.
          <div className="visible">
           Howdy, my parent element is hidden, but I'm still visible. <br></br>Hover over me to make my parent visible.
          </div>
                </div> */}
        </div>
      )
  }
}

const mapDispatchToProps = dispatch => ({
  getSingleBracelet: id => dispatch(getSingleBraceletThunk(id)),
  // this may cause issues with logged in (thunk) vs guest (plain action creator)
  addToCart: id => dispatch(addToCartThunk(id))
})

const mapStateToProps = state => {
  return {
    bracelet: state.bracelets
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleBracelet)
