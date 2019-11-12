import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getHistoryThunk} from '../store/addToCart'
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
      let orderHistory = this.props.history[0]
      let user = this.props.user

      if (!orderHistory.length) return <h4>No orders made</h4>
      else {
        return (
          <div>
            <h2> Hey there, {user.firstName}! </h2>
            <h3>Order History</h3>
            <div>
              {orderHistory.map(record => {
                return (
                  <div key={record.braceletId}>
                    <h4>Bracelet {record.braceletId}</h4>
                    <h5>Quantity {record.qty}</h5>
                    <h5>Time Order Made: {record.updatedAt}</h5>
                  </div>
                )
              })}
            </div>
            {/* <h3>Account info</h3>
            <h3>Favorites</h3>
            <h3>Wishlist</h3> */}
          </div>
        )
      }
    }
  }
}

const mapStateToProps = state => ({
  history: state.userHistory,
  bracelets: state.bracelets,
  total: state.total,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getHistory: () => dispatch(getHistoryThunk()),
  getAllBracelets: () => dispatch(getAllBraceletsThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage)
