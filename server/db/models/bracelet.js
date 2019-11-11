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
  price: {
    // cents -> pay in pennies
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: 'https://i.imgur.com/27UApTF.png'
  }
})

module.exports = Bracelet
