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

// gatekeeper function to check if user is logged in

router.get('/', async (req, res, next) => {
  try {
    let cartId = await Cart.findAll({
      where: {
        userId: req.user.id,
        isPurchased: false
      },
      attributes: ['id']
    })

    cartId = cartId[0].id

    let cart = await ItemsCart.findAll({
      where: {
        cartId: cartId
      }
    })
    if (cart) res.send(cart)
    else res.status(404).send(`404 - Can't find Your Items!`)
  } catch (err) {
    next(err)
  }
})

router.post('/:id/add', async (req, res, next) => {
  try {
    let cartId = await Cart.findOrCreate({
      where: {
        userId: req.user.id,
        isPurchased: false
      },
      attributes: ['id']
    })
    cartId = cartId[0].id

    const [item, wasCreated] = await ItemsCart.findOrCreate({
      where: {
        cartId: cartId,
        braceletId: req.params.id
      }
    })
    item.qty++
    item.save()

    if (item) res.status(201).send(item)
    else res.status(404).send(`404 - Can't Make New Purchase`)
  } catch (err) {
    next(err)
  }
})

router.put('/:id/decrease', async (req, res, next) => {
  try {
    let cartId = await Cart.findAll({
      where: {
        userId: req.user.id,
        isPurchased: false
      },
      attributes: ['id']
    })
    cartId = cartId[0].id
    let item = await ItemsCart.findAll({
      where: {
        cartId: cartId,
        braceletId: req.params.id
      }
    })
    item = item[0]
    item.qty--
    item.save()
    res.send(item)
  } catch (err) {
    next(err)
  }
})
router.delete('/:id/delete', async (req, res, next) => {
  try {
    let cartId = await Cart.findAll({
      where: {
        userId: req.user.id,
        isPurchased: false
      },
      attributes: ['id']
    })
    cartId = cartId[0].id

    const singleBracelet = await ItemsCart.findOne({
      where: {
        cartId: cartId,
        braceletId: req.params.id
      }
    })
    if (singleBracelet) {
      await singleBracelet.destroy()
      res.status(200).send(singleBracelet)
    } else {
      res
        .status(404)
        .send(`404 - Can't find bracelet with id of ${req.params.id}`)
    }
  } catch (err) {
    next(err)
  }
})
