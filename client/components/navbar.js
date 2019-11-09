import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import './navbar.css'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1>Bracelets Store</h1>
    <nav className="slidemenu">
      {isLoggedIn ? (
        <div>
          <Link to="/home">
            <a href="#" className="btn">
              Home
            </a>
          </Link>
          <Link to="/account">
            <a href="#" className="btn">
              Account
            </a>
          </Link>
          <Link to="/cart">
            <a href="#" className="btn">
              Cart
            </a>
          </Link>
          <a href="#" className="btn" onClick={handleClick}>
            Logout
          </a>
          {/* The navbar will show these links after you log in */}

          {/* <a href="#" onClick={handleClick}><label htmlFor="slide-item-4"><p className="icon">✎</p><span>Logout</span></label></a> */}

          {/* <a href="#" onClick={handleClick}>
            Logout
          </a> */}
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/home">
            <a href="#" className="btn">
              Home
            </a>
          </Link>
          <Link to="/account">
            <a href="#" className="btn">
              Account
            </a>
          </Link>
          <Link to="/cart">
            <a href="#" className="btn">
              Cart
            </a>
          </Link>
          <Link to="/cart">
            <a href="#" className="btn">
              Contact
            </a>
          </Link>

          <input
            type="radio"
            name="slideItem"
            id="slide-item-4"
            className="slide-toggle"
          />
          <Link to="/cart">
            <label htmlFor="slide-item-4">
              <p className="icon">✎</p>
              <span>Logout</span>
            </label>
          </Link>
          {/* <Link to="/cart">Cart</Link> */}
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
