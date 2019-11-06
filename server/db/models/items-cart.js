const Sequelize = require('sequelize')
const db = require('../db')

// this is for the through table

const ItemsCart = db.define('items_cart', {
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 25
    }
  }
})

module.exports = ItemsCart
