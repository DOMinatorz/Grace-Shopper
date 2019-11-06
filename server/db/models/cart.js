const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  // going to place on your Cart table, which is NOT a join table
  isPurchased: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
    // would like this to NOT be null
  },
  price: {
    // changing back to INT
    type: Sequelize.DECIMAL(10, 2),
    allowNull: true
  },
  // going into your JOIN table, and should also have a minimum**
  qty: {
    type: Sequelize.INTEGER
  }
})

module.exports = Cart
