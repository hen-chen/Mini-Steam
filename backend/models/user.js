const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  games: [String],
  friends: [String],
})

module.exports = model('User', userSchema)
