import React, {Component} from 'react'
import {connect} from 'react-redux'

export class Cart extends Component {
  render() {
    return <div>Your Cart is Empty</div>
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
