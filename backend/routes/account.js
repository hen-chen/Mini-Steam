const express = require('express')

const User = require('../models/user')
const { isAuthenticated } = require('../middlewares/isAuthenticated')

const router = express.Router()

// Sign up
router.post('/signup', async (req, res, next) => {
  const { username, password } = req.body
  try {
    await User.create({ username, password })
    res.send('User created')
  } catch (err) {
    next(new Error('user creation problems'))
  }
})

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })
    if (!user) res.send('user does not exist')
    else {
      const { password: passDB } = user
      if (password === passDB) {
        req.session.username = username
        req.session.password = password
        res.send('user login successful')
      } else {
        res.send('user credentials are wrong')
      }
    }
  } catch (err) {
    next(new Error('user login problems'))
  }
})

router.post('/logout', isAuthenticated, (req, res) => {
  req.session.username = null
  req.session.password = null
  res.send('user logged out')
})

router.post('/loggedin', (req, res) => {
  res.send(req.session.username)
})

module.exports = router
