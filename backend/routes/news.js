const express = require('express')
const request = require('request')
const router = express.Router()

router.get('/getnews', (req, res) => {
  const url = 'http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=730&count=1&maxlength=1000&format=json'
  const topweeks = 'https://steamspy.com/api.php?request=top100in2weeks'
  request(url, (err, resp, body) => {
    if (!err && resp.statusCode < 400) {
      // console.log(body)
      res.send(body)
    }
  })
})

module.exports = router
