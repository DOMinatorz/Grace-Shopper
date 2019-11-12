import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllBraceletsThunk} from '../store/bracelet'
import {Link} from 'react-router-dom'
import './all-bracelets.css'
import {object} from 'prop-types'

class AllBracelets extends Component {
  constructor() {
    super()
    this.filter = this.filter.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.clearFilter = this.clearFilter.bind(this)
    this.state = {
      isFiltered: false,
      filters: [],
      filteredBracelets: []
    }
  }

  filter(obj) {
    let filteredBracelets = [...this.props.bracelets]
    // eslint-disable-next-line guard-for-in
    for (let key in obj) {
      let filterObj = obj[key]
      let attribute = Object.keys(filterObj)[0]
      filteredBracelets = filteredBracelets.filter(bracelet => {
        if (filterObj[attribute] === 'none') return true
        return bracelet[attribute] === filterObj[attribute]
      })
    }
    this.setState({filteredBracelets: filteredBracelets})
  }

  async handleChange(event) {
    let filter = {[event.target.id]: event.target.value}
    let key = [event.target.id]

    await this.setState(prevState => ({
      isFiltered: true,
      filters: {
        ...prevState.filters,
        [key]: filter
      }
    }))
    this.filter(this.state.filters)
  }

  clearFilter(event) {
    let color = document.getElementById('color')
    let material = document.getElementById('material')
    let style = document.getElementById('style')

    color.selectedIndex = 0
    material.selectedIndex = 0
    style.selectedIndex = 0

    this.setState({
      isFiltered: false,
      filters: [],
      filteredBracelets: []
    })
  }

  componentDidMount() {
    this.props.getAllBracelets()
  }

  render() {
    let bracelets
    if (this.state.isFiltered) {
      bracelets = this.state.filteredBracelets
    } else bracelets = this.props.bracelets

    if (!bracelets.length && !this.state.isFiltered)
      return <div>Loading...</div>
    else
      return (
        <div id="all-bracelets-page">
          <div id="filter-options">
            <div id="color-filter">
              <label>Color</label>
              <select id="color" onChange={this.handleChange}>
                <option value="none"> </option>
                <option value="Black">Black</option>
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
            <div>
              <button type="button" onClick={this.clearFilter}>
                Clear
              </button>
            </div>
          </div>
          <div id="all_bracelets">
            {bracelets.length >= 1 ? (
              bracelets.map(bracelet => {
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
              })
            ) : (
              <p>Sorry, no products match those filters!</p>
            )}
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
