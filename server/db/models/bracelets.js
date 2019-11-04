const Sequelize = require('sequelize')
const db = require('../db')

const Bracelet = db.define('bracelet', {
  style: {
    type: Sequelize.STRING
  },
  color: {
    type: Sequelize.STRING
  },
  qty: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.DECIMAL(10, 2)
  },
  image: {
    type: Sequelize.STRING
  }
})

module.exports = Bracelet
