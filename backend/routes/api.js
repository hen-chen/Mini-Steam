const express = require('express')
require('isomorphic-fetch')

const { isAuthenticated } = require('../middlewares/isAuthenticated')
const Game = require('../models/games')
const User = require('../models/user')

const router = express.Router()

router.get('/getgames', async (req, res) => {
  try {
    const url = await fetch(
      'https://steamspy.com/api.php?request=top100in2weeks'
    )
    const urlJSON = await url.json()
    res.send(urlJSON)
  } catch (err) {
    next(new Error('could not get games'))
  }
})

// ======== User API ========
router.get('/api/users', async (req, res, next) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (err) {
    next(new Error('Could not get users'))
  }
})

router.post('/api/add', isAuthenticated, async (req, res, next) => {
  const { _id, game } = req.body
  try {
    User.findByIdAndUpdate(
      _id,
      { $push: { games: game } },
      function (err, model) {
        if (err !== null) console.log(err)
      }
    )
    res.send('Game added')
  } catch (err) {
    next(new Error('could not add Game'))
  }
})

router.post('/api/friend', isAuthenticated, async (req, res, next) => {
  const { _id, friend } = req.body
  try {
    const user = await User.findOne({ username: friend })
    if (!user) res.send('Friend not added')
    else {
      User.findByIdAndUpdate(
        _id,
        { $push: { friends: friend } },
        function (err, model) {
          if (err !== null) console.log(err)
        }
      )
      res.send('Friend added')
    }
  } catch (err) {
    next(new Error('could not add Friend'))
  }
})

module.exports = router
