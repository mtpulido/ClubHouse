const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const db = require("../db/connection");

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const SALT_ROUNDS = 11
const TOKEN_KEY = 'as983zZ2AKS4rhv3218isjTSK382ksfH1ks29sjdf3kjsh34bsSDjeB21k'


const signUp = async (req, res) => {
  try {
    const { displayName, email, password } = req.body
    const passwordDigest = await bcrypt.hash(password, SALT_ROUNDS)
    const user = new User({
      displayName,
      email,
      passwordDigest
    })
    
    await user.save()

    const payload = {
      username: user.displayName,
      email: user.email,
      id: user._id
    }

    const token = jwt.sign(payload, TOKEN_KEY)
    res.status(201).json({ token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (await bcrypt.compare(password, user.passwordDigest)) {
      const payload = {
        displayName: user.displayName,
        email: user.email,
        id: user._id
      }

      const token = jwt.sign(payload, TOKEN_KEY)
      res.status(201).json({ token })
    } else {
      res.status(401).send('Invalid Credentials')
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


const verify =  async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const payload = jwt.verify(token, TOKEN_KEY)
    const user = await User.findOne({ email: payload.email })
    const newPayload = {
      displayName: user.displayName,
      email: user.email,
      id: user._id
    }
      if(payload) {
          res.json(newPayload)
      }
  } catch (error) {
      res.status(401).send('Not Authorized')
  }
}

module.exports = {
  signUp,
  signIn,
  verify,
  // changePassword,
};
