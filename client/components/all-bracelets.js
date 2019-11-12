import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllBraceletsThunk} from '../store/bracelet'
import {Link} from 'react-router-dom'
import './all-bracelets.css'

class AllBracelets extends Component {
  constructor() {
    super()
    this.filter = this.filter.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      isFiltered: false,
      filter: [],
      filteredBracelets: []
    }
  }

  filter(obj) {
    let attribute = Object.keys(obj)[0]
    let filteredBracelets = this.props.bracelets.filter(bracelet => {
      return bracelet[attribute] === obj[attribute]
    })
    this.setState({filteredBracelets: filteredBracelets})
  }

  handleChange(event) {
    let filter = {[event.target.id]: event.target.value}

    this.setState({
      isFiltered: true,
      filter: [filter]
    })
    this.filter(filter)
  }

  componentDidMount() {
    this.props.getAllBracelets()
  }

  render() {
    console.log('this is state in render', this.state)
    let bracelets
    if (this.state.isFiltered) {
      bracelets = this.state.filteredBracelets
    } else bracelets = this.props.bracelets

    if (!bracelets.length) return <div>Loading...</div>
    else
      return (
        <div id="all-bracelets-page">
          <div id="filter-options">
            <div id="color-filter">
              <label>Color</label>
              <select id="color" onChange={this.handleChange}>
                <option value="none"> </option>
                <option value="Black"> Black</option>
                <option value="Cerise"> Cerise</option>
                <option value="Gray"> Gray</option>
                <option value="Ocean"> Ocean</option>
                <option value="Tan"> Tan</option>
              </select>
            </div>
            <div id="material-filter">
              <label>Material</label>
              <select id="material" onChange={this.handleChange}>
                <option value="none"> </option>

                <option value="Leather"> Leather</option>
                <option value="Suede"> Suede</option>
              </select>
            </div>
            <div id="style-filter">
              <label>Style</label>
              <select id="style" onChange={this.handleChange}>
                <option value="none"> </option>

                <option value="Solitary"> Solitary</option>
                <option value="Pair"> Pair</option>
                <option value="Trio"> Trio</option>
              </select>
            </div>
          </div>
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

const mapStateToProps = state => {
  return {
    bracelets: state.bracelets
  }
}

const mapDispatchToProps = dispatch => ({
  getAllBracelets: () => dispatch(getAllBraceletsThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllBracelets)
