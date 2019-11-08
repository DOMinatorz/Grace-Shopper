const router = require('express').Router()
const {User} = require('../db/models')
const isAdmin = require('./utils')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (!isAdmin(req.user)) res.send('GET YO HANDS OFF OUR USERS')
    else {
      const users = await User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'email', 'address']
      })
      res.send(users)
      if (!users) return res.status(404).send('There are no users')
    }
  } catch (err) {
    next(err)
  }
})
