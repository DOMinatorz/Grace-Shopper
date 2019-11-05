import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleBraceletThunk} from '../store/bracelet'
import {addToCart} from '../store/addToCart'

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
        <div>
          <h1>Style: {bracelet.style}</h1>
          <h1>Material: {bracelet.material}</h1>
          <h1>Color: {bracelet.color}</h1>
          <h1>Price: {bracelet.price}</h1>
          <button type="submit" onClick={() => this.props.addToCart(bracelet)}>
            Add to cart
          </button>
          <img src={bracelet.image} />
        </div>
      )
  }
}

const mapDispatchToProps = dispatch => ({
  getSingleBracelet: id => dispatch(getSingleBraceletThunk(id)),
  addToCart: bracelet => dispatch(addToCart(bracelet))
})

const mapStateToProps = state => {
  return {
    bracelet: state.bracelets
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleBracelet)
