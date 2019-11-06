const Sequelize = require('sequelize')
const db = require('../db')

const Bracelet = db.define('bracelet', {
  // add a description for the bracelet
  style: {
    // enum: multiple options
    // is in: seq option
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: false
    }
  },
  material: {
    // enum: multiple options
    // is in: seq option
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: false
    }
  },
  color: {
    // enum: multiple options
    // is in: seq option
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: false
    }
  },
  inventory: {
    // no min: you can end up with negative inventory :'(
    type: Sequelize.INTEGER,
    defaultValue: 100
  },
  // move this quantity into a different table that will reference user's cart
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      max: 25,
      min: 0
    }
  },
  // minimum: add in a min so that you don't pay your customer $$
  price: {
    // cents -> pay in pennies
    // store our information as INTEGER
    type: Sequelize.DECIMAL(10, 2)
  },
  image: {
    // default image
    // store as assets
    type: Sequelize.STRING
  }
})

module.exports = Bracelet
