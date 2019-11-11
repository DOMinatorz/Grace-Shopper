import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getHistoryThunk, getHistory} from '../store/addToCart'
import {getAllBraceletsThunk} from '../store/bracelet'

export class AccountPage extends Component {
  componentDidMount() {
    this.props.getAllBracelets()
    this.props.getHistory()
  }

  render() {
    if (this.props.history.length === 0) {
      return <div>Your History is Empty</div>
    } else {
      //need to fix below
      let visibleCart = this.props.bracelets.filter(bracelet => {
        return bracelet.id === this.props.history[0].braceletId
      })
      console.log('history', this.props.history[0])
      console.log('visiblecart', visibleCart)
      return (
        <div>
          <h3>Order History</h3>

          {/* <h3>Account info</h3>
          <h3>Favorites</h3>
          <h3>Wishlist</h3> */}
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  history: state.userHistory,
  bracelets: state.bracelets,
  total: state.total
})

const mapDispatchToProps = dispatch => ({
  getHistory: () => dispatch(getHistoryThunk()),
  getAllBracelets: () => dispatch(getAllBraceletsThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage)
