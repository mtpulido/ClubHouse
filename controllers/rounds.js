const Round = require('../models/round')
const db = require('../db/connection')
const User = require('../models/user')
const { addJustCreatedRound } = require('./users')
const { editRecentRound } = require('./users')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const handleErrors = (err) => {
  let errors = {}

  if (err.message.includes('Cast to Number')) {
    Object.values(err.errors).forEach((error) => {
      errors[error.path] = `${error.path} requires a number`
    })
    return errors
    }
  
  if (err.message.includes('rounds validation failed')) {
    Object.values(err.errors).forEach((error) => {
      errors[error.properties.path] = error.properties.message
    })
  }
  return errors
}



const getRounds = async (req, res) => {
  try {
    const rounds = await Round.find().populate('userId')
    res.status(201).json(rounds)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getRound = async (req, res) => {
  try {
    const { id } = req.params
    const round = await Round.findById(id).populate('userId')

    if (round) {
      res.status(201).json(round)
    } else {
      res.status(404).json({ message: "Round not found" })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


const createRound = async (req, res) => {
  try {
    let user = res.locals.authorizedUser
    const round = await new Round(req.body)

    round.userId = user
    await round.save()
  
    res.status(201).json(round)
    addJustCreatedRound(user, round)
  } catch (error) {
    const errors = handleErrors(error)
    res.status(500).json({ errors })
  }
}

const updateRound = async (req, res) => {
  const { id } = req.params
    await Round.findByIdAndUpdate(id, req.body, { new: true }, { runValidators: true }, (error, round) => {
      if (error) {
        return res.status(500).json({ error: error.message })
      }
      if (!round) {
        return res.status(404).json({ message: 'Round not found' })
      }
      res.status(201).json(round)
      editRecentRound(res.locals.authorizedUser, round)
    })
  }


module.exports = {
  getRounds,
  getRound,
  createRound,
  updateRound
}