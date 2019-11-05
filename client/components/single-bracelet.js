import React, {Component} from 'react'
import {connect} from 'react-redux'

const SingleBracelet = props => {
  const id = Number(props.match.params.id)
  let bracelet = props.bracelets.filter(bracelet => {
    return bracelet.id === id
  })
  bracelet = bracelet[0]
  return (
    <div>
      <h1>Style: {bracelet.style}</h1>
      <h1>Material: {bracelet.material}</h1>
      <h1>Color: {bracelet.color}</h1>
      <h1>Price: {bracelet.price}</h1>
      <img src={bracelet.image} />
    </div>
  )
}
const mapStateToProps = state => {
  return {
    bracelets: state.bracelets
  }
}

export default connect(mapStateToProps)(SingleBracelet)
