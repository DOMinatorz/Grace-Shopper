const Sequelize = require('sequelize')
const db = require('../db')

const Bracelet = db.define('bracelet', {
  style: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: false
    }
  },
  material: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: false
    }
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: false
    }
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 100
  },
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      max: 25,
      min: 0
    }
  },
  price: {
    type: Sequelize.DECIMAL(10, 2)
  },
  image: {
    type: Sequelize.STRING
  }
})

module.exports = Bracelet
