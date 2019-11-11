import React, {Component} from 'react'
import {connect} from 'react-redux'

export class AccountPage extends Component {
  render() {
    let user = this.props.user
    return (
      <div id="account-page">
        <h2> Hey there, {user.firstName}! </h2>
        <h3>Account info:</h3>
        <h4>
          Name: {user.firstName} {user.lastName} <br />
          Email: {user.email}
          <br />
        </h4>
        <h3>Order History</h3>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(AccountPage)
