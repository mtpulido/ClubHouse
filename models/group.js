const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Group = new Schema(
  {

  },
  { timestamps: true }
)

module.exports = mongoose.model('groups', Group)