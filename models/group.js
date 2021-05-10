const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Group = new Schema(
  {
    name: { type: String, required: true },
    avatar: { data: Buffer, contentType: String, required: false },
    members: [{ type: Schema.Types.ObjectId, ref: 'users' }]
  },
  { timestamps: true }
)

module.exports = mongoose.model('groups', Group)