import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {accountPage} from './accountPage'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {firstName} = props

  return (
    <div>
      <h3>Welcome, {firstName}</h3>
      <accountPage />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    firstName: state.user.firstName
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
