const router = require('express').Router()
const {Cart, ItemsCart, Bracelet} = require('../db/models')
// const {Op} = require('sequelize')
module.exports = router

// BEFORE THIS WE NEED TO CHECK FOR PAYMENT
router.put('/', async (req, res, next) => {
  try {
    let userId = req.user.id
    let cartToBeCompleted = await Cart.findAll({
      where: {
        isPurchased: false,
        userId
      }
    })
    let cartId = cartToBeCompleted[0].id
    cartToBeCompleted[0].isPurchased = true
    cartToBeCompleted[0].save()
    let itemCart = await ItemsCart.findAll({
      where: {
        cartId
      }
    })

    for (let i = 0; i < itemCart.length; i++) {
      let currBraceletId = itemCart[i].braceletId
      let currBracelet = await Bracelet.findByPk(currBraceletId)
      currBracelet.inventory = currBracelet.inventory - itemCart[i].qty
      itemCart[i].price = currBracelet.price
      currBracelet.save()
      itemCart[i].save()
    }
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})
