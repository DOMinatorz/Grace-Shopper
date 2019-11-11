/* Not using this component but keeping for now because of tests, don't want to delete
test page incase we need to reference it for writing additional tests */

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
