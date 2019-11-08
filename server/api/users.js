const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    console.log('do i go in here?')
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'firstName', 'lastName', 'email', 'address']
    })
    res.send(users)
    if (!users) return res.status(404).send('There are no users')
  } catch (err) {
    next(err)
  }
})
