import React, {Component} from 'react'
import {connect} from 'react-redux'

export class AccountPage extends Component {
  render() {
    return (
      <div>
        <h3>Order History</h3>
        <h3>Account info</h3>
        <h3>Favorites</h3>
        <h3>Wishlist</h3>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage)
