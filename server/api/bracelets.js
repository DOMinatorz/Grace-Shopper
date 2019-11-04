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
