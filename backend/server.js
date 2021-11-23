const express = require('express')
const session = require('cookie-session')

// Routes
const NewsRouter = require('./routes/news')

const app = express()

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//   next()
// })

app.use('', NewsRouter)

app.listen(3000, () => {
  console.log('listening on port 3000')
})
