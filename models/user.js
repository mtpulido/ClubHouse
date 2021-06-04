const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const User = new Schema(
  {
    email: {
      type: String,
      required: [true, "-Please enter an email address"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "-Please enter a valid email address"],
    },
    passwordDigest: {
      type: String, 
      required: [true, "-Please enter a password"],
      minlength: [8, "-Password must have 8+ characters"],
    },
    displayName: {
      type: String,
      required: [true, "-Please enter a display name"],
      maxlength: [30, "-Display Name max. 30 characters"]
    },
    avatar: {
      type: String,
      required: false
    },
    recentRounds: [{
      course: {
        type: String,
        required: [true, "-Please enter the course played"]
      },
      par: {
        type: Number,
        required: [true, "-Please enter par for the course"]
      },
      holes: {
        type: Number,
        required: [true, "-Please enter holes for your round"]
      },
      score: {
        type: Number,
        required: [true, "-Please enter score for your round"]
      },
      fairwaysHit: {
        type: Number,
        required: false
      },
      possibleFairways: {
        type: Number,
        required: false
      },
      putts: {
        type: Number,
        required: false
      },
      greens: {
        type: Number,
        required: false
      },
      upAndDowns: {
        type: Number,
        required: false
      },
      possibleUpAndDowns: {
        type: Number,
        required: false
      },
      createdAt: {type: Date, default: Date.now}
    }],
    groups: [{
      type: Schema.Types.ObjectId,
      ref: "groups"
    }],
  },
  { timestamps: true,
  toJSON: { virtuals: true}}
);

//mongoose 'pre' hook on the save action to hash the password.
User.pre('save', async function (next) {
  if (this.isNew) {
    const salt = await bcrypt.genSalt()
    this.passwordDigest = await bcrypt.hash(this.passwordDigest, salt)
    next()
  }
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

User.virtual('last30Days').get(function () {
  let date = new Date()
  date.setDate(date.getDate() - 30)

  let totals = {
    scoring: 0,
    holes: 0,
    fairwaysHit: 0,
    possibleFairways: 0,
    greens: 0,
    putting: 0,
    rounds: 0,
  }

  this.recentRounds.forEach((round) => {
    if (round.createdAt > date) {
      totals.scoring += round.score
      totals.holes += round.holes
      totals.fairwaysHit += round.fairwaysHit
      totals.possibleFairways += round.possibleFairways
      totals.greens += round.greens
      totals.putting += round.putts
      totals.rounds += 1
    }
  })

  let last30Days = {
    scoring: (totals.scoring / totals.rounds).toFixed(2),
    driving: (totals.fairwaysHit / totals.possibleFairways).toFixed(2),
    greens: (totals.greens / totals.holes).toFixed(2),
    putting: (totals.putting / totals.rounds).toFixed(2),
  }

  
  return last30Days
})

User.virtual('last60Days').get(function () {
  let date = new Date()
  date.setDate(date.getDate() - 60)

  let totals = {
    scoring: 0,
    holes: 0,
    fairwaysHit: 0,
    possibleFairways: 0,
    greens: 0,
    putting: 0,
    rounds: 0,
  }

  this.recentRounds.forEach((round) => {
    if (round.createdAt > date) {
      totals.scoring += round.score
      totals.holes += round.holes
      totals.fairwaysHit += round.fairwaysHit
      totals.possibleFairways += round.possibleFairways
      totals.greens += round.greens
      totals.putting += round.putts
      totals.rounds += 1
    }
  })

  let last60Days = {
    scoring: (totals.scoring / totals.rounds).toFixed(2),
    driving: (totals.fairwaysHit / totals.possibleFairways).toFixed(2),
    greens: (totals.greens / totals.holes).toFixed(2),
    putting: (totals.putting / totals.rounds).toFixed(2),
  }

  
  return last60Days
})

User.virtual('last90Days').get(function () {
  let date = new Date()
  date.setDate(date.getDate() - 90)

  let totals = {
    scoring: 0,
    holes: 0,
    fairwaysHit: 0,
    possibleFairways: 0,
    greens: 0,
    putting: 0,
    rounds: 0,
  }

  this.recentRounds.forEach((round) => {
    if (round.createdAt > date) {
      totals.scoring += round.score
      totals.holes += round.holes
      totals.fairwaysHit += round.fairwaysHit
      totals.possibleFairways += round.possibleFairways
      totals.greens += round.greens
      totals.putting += round.putts
      totals.rounds += 1
    }
  })

  let last90Days = {
    scoring: (totals.scoring / totals.rounds).toFixed(2),
    driving: (totals.fairwaysHit / totals.possibleFairways).toFixed(2),
    greens: (totals.greens / totals.holes).toFixed(2),
    putting: (totals.putting / totals.rounds).toFixed(2),
  }

  
  return last90Days
})

User.virtual('last6Months').get(function () {
  let date = new Date()
  date.setDate(date.getDate() - 183)

  let totals = {
    scoring: 0,
    holes: 0,
    fairwaysHit: 0,
    possibleFairways: 0,
    greens: 0,
    putting: 0,
    rounds: 0,
  }

  this.recentRounds.forEach((round) => {
    if (round.createdAt > date) {
      totals.scoring += round.score
      totals.holes += round.holes
      totals.fairwaysHit += round.fairwaysHit
      totals.possibleFairways += round.possibleFairways
      totals.greens += round.greens
      totals.putting += round.putts
      totals.rounds += 1
    }
  })

  let last6Months = {
    scoring: (totals.scoring / totals.rounds).toFixed(2),
    driving: (totals.fairwaysHit / totals.possibleFairways).toFixed(2),
    greens: (totals.greens / totals.holes).toFixed(2),
    putting: (totals.putting / totals.rounds).toFixed(2),
  }

  
  return last6Months
})

module.exports = mongoose.model("users", User);
