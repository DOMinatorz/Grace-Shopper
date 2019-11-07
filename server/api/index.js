const router = require('express').Router()
module.exports = router

// any PUT POST DELETE -> protect these as well.
// gatekeeper middleware

// gatekeeper.js
function isUser(req, res, next) {
  if (process.env.NODE_ENV !== 'test') {
    if (!req.user) {
      throw new Error('There is no user!')
    }
  } else {
    next()
  }
}

// block user routes
router.use('/users', isUser, require('./users'))
// this is fine for everyone to see
router.use('/bracelets', require('./bracelets'))
// must block cart -> allow only the user to see their own cart
router.use('/cart', require('./cart'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
