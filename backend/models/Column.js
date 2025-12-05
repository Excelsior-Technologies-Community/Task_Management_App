const mongoose = require('mongoose')
const ColumnSchema = new mongoose.Schema({
  title: String,
  order: Number,
  board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }]
})
module.exports = mongoose.model('Column', ColumnSchema)
