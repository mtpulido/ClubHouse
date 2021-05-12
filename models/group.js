const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Group = new Schema(
  {
    name: {
      type: String,
      required: [true, "Groups must have a name"]
    },
    avatar: {
      data: Buffer,
      contentType: String,
      required: false
    },
    members: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    adminId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      // required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('groups', Group)