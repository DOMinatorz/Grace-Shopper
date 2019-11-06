const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  // going to place on your Cart table, which is NOT a join table

  // this will have a userId and a foreign key by default

  isPurchased: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
})

module.exports = Cart
