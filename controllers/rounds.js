const Round = require('../models/round')
const db = require('../db/connection')
const User = require('../models/user')
const { addJustCreatedRound } = require('./users')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

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
    let user = res.locals.user
    const round = await new Round(req.body)

    round.userId = user
    await round.save()
  
    res.status(201).json(round)
    addJustCreatedRound(user, round)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateRound = async (req, res) => {
  const { id } = req.params
  await Round.findByIdAndUpdate(id, req.body, { new: true }, { runValidators: true }, (error, round) => {
    if (error) {
      return res.status(500).json({ error: error.message })
    }
    if (!round) {
      return res.status(404).json({ message: 'Round not found'})
    }
    res.status(201).json(round)
  })
}

module.exports = {
  getRounds,
  getRound,
  createRound,
  updateRound
}