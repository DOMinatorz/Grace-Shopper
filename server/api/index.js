const router = require('express').Router()
module.exports = router

function isUser(req, res, next) {
  if (process.env.NODE_ENV !== 'test') {
    if (!req.user) {
      throw new Error('There is no user!')
    }
  } else {
    next()
  }
}

router.use('/users', require('./users'))
router.use('/bracelets', require('./bracelets'))
router.use('/cart', isUser, require('./cart'))

router.use('/checkout', require('./checkout'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
