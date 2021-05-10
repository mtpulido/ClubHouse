const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Analysis = new Schema(
  {

  },
  { timestamps: true }
)

module.exports = mongoose.model('analysis', Analysis)