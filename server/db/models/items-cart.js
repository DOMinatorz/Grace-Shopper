const Sequelize = require('sequelize')
const db = require('../db')

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
