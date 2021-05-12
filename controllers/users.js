const jwt = require("jsonwebtoken");
const User = require("../models/user");
const db = require("../db/connection");
const Round = require("../models/round")

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const TOKEN_KEY = 'as983zZ2?AKS4rhv3218isjTSK3!82ksfH1ks29sj/df3kjsh34+bsSD-jeB21k'


const handleErrors = (err) => {
  let errors = { displayName: '', email: '', passwordDigest: '' }
  // incorrect email login
  if (err.message === 'incorrect email') {
    errors.email = 'Email not registered'
  }
  // incorrect password login
  if (err.message === 'incorrect password') {
    errors.passwordDigest = 'Password is incorrect'
  }
  //duplicate email signup
  if (err.code === 11000) {
    errors.email = 'Email already in use'
    return errors
  }
  // validation errors signup
  if (err.message.includes('users validation failed')) {
    Object.values(err.errors).forEach((error) => {
      errors[error.properties.path] = error.properties.message
    })
  }
  return errors
}


const signUp = async (req, res) => {
  try {
    const { displayName, email, password } = req.body
    const passwordDigest = password
    const user = await User.create({ displayName, email, passwordDigest })
    //password hashed in models/user.js
    const payload = {
      username: user.displayName,
      email: user.email,
      id: user._id
    }
    const token = jwt.sign(payload, TOKEN_KEY)
    res.status(201).json({ token })
  } catch (error) {
    const errors = handleErrors(error)
    res.status(400).json({ errors })
  }
}

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.login(email, password)
    
      const payload = {
        displayName: user.displayName,
        email: user.email,
        id: user._id
      }

      const token = jwt.sign(payload, TOKEN_KEY)
      res.status(201).json({ token })
    } 
  catch (error) {
    const errors = handleErrors(error)
    res.status(400).json({ errors })
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

const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('rounds')
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createRound = async (req, res) => {
  try {
    let user = await User.findById(req.params.id)
    let round = await new Round(req.body)

    round.userId = user
    await round.save()
    user.rounds.push(round)
    await user.save()
    console.log("user", user)
    console.log("round", round)
    res.status(201).json(round)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  signUp,
  signIn,
  verify,
  getUsers,
  createRound,
  // changePassword,
};
