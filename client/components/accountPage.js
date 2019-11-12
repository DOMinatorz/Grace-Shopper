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
      //need to fix below
      // let orderHistory = this.props.bracelets.filter(bracelet => {
      //   //return bracelet.id === this.props.history[0].braceletId

      //   // for(let i=0;i<this.props.history[0].length;i++){
      //   //   console.log('history record=',this.props.history[0][i].braceletId)
      //   //   return this.props.history[0][i].braceletsId===bracelet.id
      //   // }

      //   console.log(bracelet)
      //   return this.props.history[0].filter(record=>{
      //     console.log('record',record.braceletId,'=== bracelet.id',bracelet.id)

      //     return record.braceletId===bracelet.id
      //   })

      // })

      let orderHistory = this.props.history[0]

      console.log(Array.isArray([]))
      console.log(
        'history: is array:',
        Array.isArray(this.props.history[0]),
        this.props.history[0]
      ) //works
      console.log('bracelets', this.props.bracelets) //works
      console.log('orderhistory', orderHistory) //does not work

      if (!orderHistory.length) return <h4>No orders made</h4>
      else {
        return (
          <div>
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
    //pulled from lily below

    // let user = this.props.user
    // return (
    //   <div id="account-page">
    //     <h2> Hey there, {user.firstName}! </h2>
    //     <h3>Account info:</h3>
    //     <h4>
    //       Name: {user.firstName} {user.lastName} <br />
    //       Email: {user.email}
    //       <br />
    //     </h4>
    //     <h3>Order History</h3>
    //   </div>
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
