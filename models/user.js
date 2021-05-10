const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
  {
    email: { type: String, required: true },
    password_digest: { type: String, required: true },
    displayName: { type: String, required: true },
    avatar: { data: Buffer, contentType: String, required: false },
    rounds: [{ type: Schema.Types.ObjectId, ref: 'rounds' }]
  },
  { timestamps: true }
)

module.exports = mongoose.model('users', User)