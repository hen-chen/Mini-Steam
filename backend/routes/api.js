const express = require('express')
const request = require('request')

const { isAuthenticated } = require('../middlewares/isAuthenticated')
const Game = require('../models/games')

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
router.get('/profile', isAuthenticated, async (req, res, next) => {
  try {
    const games = await Game.find()
    res.send(games)
  } catch (err) {
    next(new Error('Could not get games'))
  }
})

router.post('/add', isAuthenticated, async (req, res, next) => {
  const { game } = req.body
  try {
    await Game.create({ game })
    res.send('Game added')
  } catch (err) {
    next(new Error('could not add Game'))
  }
})

module.exports = router
