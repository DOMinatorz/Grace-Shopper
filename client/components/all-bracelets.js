import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllBraceletsThunk} from '../store/bracelet'

class AllBracelets extends Component {
  // constructor () {
  //   super()
  // }

  componentDidMount() {
    // this isnt causing an update so the render only happens once
    this.props.getAllBracelets()
  }

  render() {
    const bracelets = this.props.bracelets
    console.log('this is bracelets', bracelets)
    if (!bracelets) return <div>Loading...</div>
    else {
      return (
        <div id="all_bracelets">
          {bracelets.map(bracelet => {
            return <p key={bracelet.id}>{bracelet.name}</p>
          })}
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
