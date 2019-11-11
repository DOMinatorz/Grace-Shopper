import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllBraceletsThunk} from '../store/bracelet'
import {Link} from 'react-router-dom'
import './all-bracelets.css'
// import law from './law.jpg'

class AllBracelets extends Component {
  // constructor () {
  //   super()
  // }

  componentDidMount() {
    // this isnt causing an update so the render only happens once
    // still not working
    this.props.getAllBracelets()
  }

  render() {
    // localStorage.setItem('product', 5);
    //console.log('how many times do i render')
    const bracelets = this.props.bracelets
    // console.log('this is bracelets', bracelets)
    // console.log('this is this.props', this.props)
    if (!bracelets) return <div>Loading...</div>
    else {
      return (
        <div>
          <div id="all_bracelets">
            {bracelets.map(bracelet => {
              //console.log('this is bracelet', bracelet)
              return (
                <div
                  className="shop-item"
                  key={bracelet.id}
                  bracelet={bracelet}
                >
                  <Link to={`/bracelets/${bracelet.id}`}>
                    <img src={bracelet.image} />
                    {/* Bracelet {bracelet.id} */}
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
