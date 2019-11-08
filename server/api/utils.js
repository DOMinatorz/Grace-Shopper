const isAdmin = user => {
  if (!user || !user.isAdmin) return false
  else return true
}

module.exports = isAdmin
