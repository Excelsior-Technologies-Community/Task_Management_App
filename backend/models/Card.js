const mongoose = require('mongoose')
const CardSchema = new mongoose.Schema({
  title: String,
  description: String,
  order: Number,
  column: { type: mongoose.Schema.Types.ObjectId, ref: 'Column' }
})
module.exports = mongoose.model('Card', CardSchema)
