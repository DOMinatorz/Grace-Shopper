import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import './navbar.css'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="pos">
    <h1>Bracelets Store</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/">
            <a href="#" className="btn">
              Home
            </a>
          </Link>
          <Link to="/shop">
            <a href="#" className="btn">
              Shop
            </a>
          </Link>
          <Link to="/account">
            <a href="#" className="btn">
              Account
            </a>
          </Link>
          <Link to="/cart">
            <a href="#" className="btn">
              Cart 🛒
            </a>
          </Link>
          <a href="#" className="btn" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/shop">
            <a href="#" className="btn">
              Shop
            </a>
          </Link>
          <Link to="/login">
            <a href="#" className="btn">
              Login
            </a>
          </Link>
          <Link to="/signup">
            <a href="#" className="btn">
              SignUp
            </a>
          </Link>
          <Link to="/cart">
            <a href="#" className="btn">
              Cart
            </a>
          </Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
