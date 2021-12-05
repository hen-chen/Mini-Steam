const express = require('express')
const request = require('request')

const { isAuthenticated } = require('../middlewares/isAuthenticated')
const Game = require('../models/games')
const User = require('../models/user')

const router = express.Router()

router.get('/getnews', (req, res) => {
  const url =
    'http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=730&count=1&maxlength=1000&format=json'
  const topweeks = 'https://steamspy.com/api.php?request=top100in2weeks'
  request(url, (err, resp, body) => {
    if (!err && resp.statusCode < 400) {
      // console.log(body)
      res.send(body)
    }
  })
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
    console.log("here1")
    User.findByIdAndUpdate(
      _id,
      {$push: {"games": game}},
      function(err, model) {
        if (err !== null) console.log(err)
      }
    )
    res.send('Game added')
  } catch (err) {
    next(new Error('could not add Game'))
  }
})

module.exports = router
