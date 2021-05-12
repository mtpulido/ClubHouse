const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const User = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter valid email"],
    },
    passwordDigest: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [8, "Password must have 8+ characters"],
    },
    displayName: {
      type: String,
      required: [true, "Please enter a display name"],
    },
    avatar: { data: Buffer, contentType: String, required: false },
    rounds: [{ type: Schema.Types.ObjectId, ref: "rounds" }],
    groups: [{ type: Schema.Types.ObjectId, ref: "groups" }],
  },
  { timestamps: true }
);

//mongoose 'pre' hook on the save action to hash the password.
User.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.passwordDigest = await bcrypt.hash(this.passwordDigest, salt)
  next()
})

User.statics.login = async function (email, password) {
  const user = await this.findOne({ email })
  if (user) {
    const authenticate = await bcrypt.compare(password, user.passwordDigest)
    if (authenticate) {
      return user
    }
    throw Error('incorrect password')
  }
  throw Error('incorrect email')
}

module.exports = mongoose.model("users", User);
