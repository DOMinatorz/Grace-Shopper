import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllBraceletsThunk} from '../store/bracelet'
import {Link} from 'react-router-dom'
import './all-bracelets.css'

class AllBracelets extends Component {
  componentDidMount() {
    this.props.getAllBracelets()
  }

  render() {
    const bracelets = this.props.bracelets
    if (!bracelets.length) return <div>Loading...</div>
    else {
      return (
        <div>
          <div id="all_bracelets">
            {bracelets.map(bracelet => {
              return (
                <div
                  className="shop-item"
                  key={bracelet.id}
                  bracelet={bracelet}
                >
                  <Link to={`/bracelets/${bracelet.id}`}>
                    <img src={bracelet.image} />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    bracelets: state.bracelets
  }
}

const mapDispatchToProps = dispatch => ({
  getAllBracelets: () => dispatch(getAllBraceletsThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllBracelets)
