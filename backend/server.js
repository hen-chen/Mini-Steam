const express = require('express')
const mongoose = require('mongoose')
const session = require('cookie-session')
const path = require('path')

const { errorHandler } = require('./middlewares/errorHandler')

// Routes
const AccountRouter = require('./routes/account')
const APIRouter = require('./routes/api')

const app = express()

const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://dbUser:dbUserPassword@cluster0.28lky.mongodb.net/Steam?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//   next()
// })

app.use(express.static('dist'))

// handling POST -> req.body
app.use(express.json())

app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 1000000,
}))

app.use('/account', AccountRouter)
app.use('', APIRouter)
app.use(errorHandler)

// set favicon
app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

// set the initial entry point
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})
