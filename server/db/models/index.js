const User = require('./user')
const Bracelet = require('./bracelet')

const Sequelize = require('sequelize')
const db = require('../db')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

const Cart = db.define('cart', {
  isPurchsed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: true
  },
  qty: {
    type: Sequelize.INTEGER
  }
})

User.belongsToMany(Bracelet, {through: Cart})

Bracelet.belongsToMany(User, {through: Cart})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Bracelet,
  Cart
}
