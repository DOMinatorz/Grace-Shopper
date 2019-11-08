import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartThunk} from '../store/addToCart'
import {getAllBraceletsThunk} from '../store/bracelet'

export class UserCheckout extends Component {
  componentDidMount() {
    console.log(this.props)
    this.props.getAllBracelets()
  }
  render() {
    return <div>loading</div>
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
