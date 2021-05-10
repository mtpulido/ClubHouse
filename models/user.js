const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
  {

  },
  { timestamps: true }
)

module.exports = mongoose.model('users', User)