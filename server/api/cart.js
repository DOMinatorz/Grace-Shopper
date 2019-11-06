const router = require('express').Router()
const {Cart, ItemsCart, Bracelet} = require('../db/models')
const {Op} = require('sequelize')
module.exports = router

// router.get('/:id', async (req, res, next) => {
//   try {
//     const cart = await Cart.findAll({
//       where: {
//         userId: req.params.id,
//         isPurchased: false
//       }
//     })
//     if (!cart) {
//       res.status(404).send('Cart not found')
//     } else res.send(cart)
//   } catch (error) {
//     next(error)
//   }
// })

router.get('/', async (req, res, next) => {
  try {
    console.log('this is req.user.id', req.user.id)
    let cartId = await Cart.findAll({
      where: {
        userId: req.user.id
      },
      attributes: ['id']
    })
    cartId = cartId[0].id

    let braceletIds = await ItemsCart.findAll({
      where: {
        cartId: cartId
      },
      attributes: ['braceletId']
    })

    let arrBraceletIds = braceletIds.map(bracelet => {
      return bracelet.braceletId
    })

    const bracelets = await Bracelet.findAll({
      where: {
        id: {
          [Op.in]: arrBraceletIds
        }
      }
    })
    if (bracelets) res.send(bracelets)
    else res.status(404).send(`404 - Can't find Your Items!`)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {id, isPurchased} = req.body
    const newPurchase = await Cart.create({
      id,
      isPurchased
    })
    if (newPurchase) res.send(newPurchase)
    else res.status(404).send(`404 - Can't Make New Purchase`)
  } catch (err) {
    next(err)
  }
})

router.put('/:id/increase', async (req, res, next) => {
  try {
    const updatedPurchase = await Cart.findById(req.params.id).then(
      bracelet => {
        bracelet.update({quantity: bracelet.quantity + 1})
      }
    )
    res.send(updatedPurchase)
  } catch (err) {
    next(err)
  }
})

router.put('/:id/decrease', async (req, res, next) => {
  try {
    const updatedPurchase = await Cart.findById(req.params.id).then(
      bracelet => {
        bracelet.update({quantity: bracelet.quantity - 1})
      }
    )
    res.send(updatedPurchase)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const singleBracelet = await Cart.findById(req.params.id)

    if (singleBracelet) {
      let x = singleBracelet.destroy()
      console.log('returned from destroy', x)
      res.status(200).send('deleted')
    } else {
      res
        .status(404)
        .send(`404 - Can't find bracelet with id of ${req.params.id}`)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    const allBracelets = await Cart.findAll()
    if (allBracelets) {
      let x = allBracelets.destroy()
      console.log('returned from destroy', x)
      res.status(200).send('deleted')
    } else {
      res.status(404).send(`404 - Can't find bracelets`)
    }
  } catch (err) {
    next(err)
  }
})
