const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Group = new Schema(
  {
    name: {
      type: String, required: [true, "-Groups must have a name"]
    },
    avatar: {
      type: String,
      required: false
    },
    members: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    admin: {
      email: { type: String, required: true },
      id: { type: String, required: true },
      displayName: { type: String, required: true },
    },
    requests: [{
      userId: { type: String, required: true },
      displayName: { type: String, required: true },
      avatar: {
        type: String,
        required: false
      },
    }],
    isOpen:  { type: Boolean, default: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('groups', Group)