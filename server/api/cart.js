const router = require('express').Router()
const {Cart} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: {
        userId: req.params.id,
        isPurchased: false
      }
    })
    if (!cart) {
      res.status(404).send('Cart not found')
    } else res.send(cart)
  } catch (error) {
    next(error)
  }
})

router.get('/:id/history', async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: {
        userId: req.params.id,
        isPurchased: true
      }
    })
    if (cart) {
      res.send(cart)
    } else res.status(404).send('Purchase history not found')
  } catch (error) {
    next(error)
  }
})
