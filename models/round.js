const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Round = new Schema(
  {
    course: { type: String, required: true },
    par: { type: Number, required: true },
    holes: { type: Number, required: true },
    score: { type: Number, required: true },
    fairwaysHit: { type: Number, required: true },
    possibleFairways: { type: Number, required: true },
    putts: { type: Number, required: true },
    greens: { type: Number, required: true },
    upAndDowns: { type: Number, required: true },
    possibleUpAndDowns: { type: Number, required: true },
    userId: {type: Schema.Types.ObjectId, ref: 'users'}
  },
  { timestamps: true }
)

module.exports = mongoose.model('rounds', Round)