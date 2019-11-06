const User = require('./user')
const Bracelet = require('./bracelet')
const Cart = require('./cart')
const ItemsCart = require('./items-cart')

const Sequelize = require('sequelize')
const db = require('../db')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

// throw this into a different file

Cart.belongsTo(User)
Bracelet.belongsToMany(Cart, {through: ItemsCart})
Cart.belongsToMany(Bracelet, {through: ItemsCart})

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
