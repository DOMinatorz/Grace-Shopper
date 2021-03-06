const router = require('express').Router()
const {Cart, ItemsCart, Bracelet} = require('../db/models')
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
    let itemCart = await ItemsCart.findAll({
      where: {
        cartId
      }
    })
    let cartTotal = 0
    for (let i = 0; i < itemCart.length; i++) {
      let currBraceletId = itemCart[i].braceletId
      let currBracelet = await Bracelet.findByPk(currBraceletId)
      currBracelet.inventory = currBracelet.inventory - itemCart[i].qty
      itemCart[i].price = currBracelet.price
      cartTotal = cartTotal + itemCart[i].qty * currBracelet.price
      currBracelet.save()
      itemCart[i].save()
    }
    cartToBeCompleted[0].totalCost = cartTotal
    cartToBeCompleted[0].save()
    await Cart.create({
      isPurchased: false,
      userId
    })
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

// WILL NOT STORE GUEST PURCHASE INFO, NEEDS TO BE ADDED LATER
router.put('/guest', async (req, res, next) => {
  try {
    let cart = req.body
    let braceletIds = Object.keys(cart)
    let dbCart = await Cart.create({
      isPurchased: true
    })
    let cartId = dbCart.id
    let itemCart = []
    for (let i = 0; i < braceletIds.length; i++) {
      itemCart.push({braceletId: braceletIds[i], qty: cart[braceletIds[i]]})
    }
    let totalCost = 0
    for (let i = 0; i < itemCart.length; i++) {
      let currBraceletId = itemCart[i].braceletId
      let currBracelet = await Bracelet.findByPk(currBraceletId)
      currBracelet.inventory = currBracelet.inventory - itemCart[i].qty
      totalCost = totalCost + currBracelet.price * itemCart[i].qty
      await ItemsCart.create({
        price: currBracelet.price,
        qty: itemCart[i].qty,
        braceletId: currBraceletId,
        cartId
      })
      currBracelet.save()
    }
    dbCart.totalCost = totalCost
    dbCart.save()
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})
