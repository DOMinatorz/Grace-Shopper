import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllBraceletsThunk} from '../store/bracelet'

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
    console.log('how many times do i render')
    const bracelets = this.props.bracelets
    console.log('this is bracelets', bracelets)
    console.log('this is this.props', this.props)
    if (!bracelets) return <div>Loading...</div>
    else {
      return (
        <div id="all_bracelets">
          {bracelets.map(bracelet => {
            console.log('this is bracelet', bracelet)
            return <p key={bracelet.id}> {bracelet.style} </p>
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
