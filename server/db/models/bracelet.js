const Sequelize = require('sequelize')
const db = require('../db')

const Bracelet = db.define('bracelet', {
  style: {
    type: Sequelize.ENUM,
    values: ['Solitary', 'Pair', 'Trio'],
    allowNull: false,
    validate: {
      notEmpty: false
    }
  },
  material: {
    type: Sequelize.ENUM,
    values: ['Leather', 'Suede'],
    allowNull: false,
    validate: {
      notEmpty: false
    }
  },
  color: {
    type: Sequelize.ENUM,
    values: ['Ocean', 'Tan', 'Black', 'Cerise', 'Gray'],
    allowNull: false,
    validate: {
      notEmpty: false
    }
  },
  longname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: false
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: false
    }
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  // move this quantity into a different table that will reference user's cart
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 25
    }
  },
  price: {
    // cents -> pay in pennies
    // store our information as INTEGER
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  image: {
    // default image
    // store as assets
    type: Sequelize.TEXT,
    defaultValue:
      'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiaypXaw9blAhUvwVkKHb7DCAkQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.davidjones.com%2Fbrand%2Fmadewell%2F22910661%2FWide-Leg-Crop-Jean-In-Pure-White.html&psig=AOvVaw02P9iYlfMrrUZH1HWLLrUT&ust=1573162111002874'
  }
})

module.exports = Bracelet
