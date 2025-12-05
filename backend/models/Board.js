const mongoose = require('mongoose')
const BoardSchema = new mongoose.Schema({
  title: String,
  columns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Column' }]
})
module.exports = mongoose.model('Board', BoardSchema)
