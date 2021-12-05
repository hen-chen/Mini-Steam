const { Schema, model } = require('mongoose')

const gameSchema = new Schema({
  game: { type: String, required: true },
})

module.exports = model('Game', gameSchema)
