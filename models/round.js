const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Round = new Schema(
  {
    course: { type: String, required: true },
    par: { type: Number, required: true },
    holes: { type: Number, required: true },
    score: { type: Number, required: true },
    fairwaysHit: { type: Number, required: false },
    possibleFairways: { type: Number, required: false },
    putts: { type: Number, required: false },
    greens: { type: Number, required: false },
    upAndDowns: { type: Number, required: false },
    possibleUpAndDowns: { type: Number, required: false },
    userId: { type: Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("rounds", Round);
