const router = require('express').Router()
const {Bracelet} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const bracelets = await Bracelet.findAll()
    res.send(bracelets)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const bracelet = await Bracelet.findAll({
      where: {
        id: req.params.id
      }
    })

    if (!bracelet) {
      res.status(404).send(`Sorry, we don't have that bracelet!`)
    }
    res.send(bracelet)
  } catch (err) {
    next(err)
  }
})
