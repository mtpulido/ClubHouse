const Round = require('../models/round')
const db = require('../db/connection')
const User = require('../models/user')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const getRounds = async (req, res) => {
  try {
    const rounds = await Round.find().populate('users')
    console.log(rounds)
    res.json(rounds)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getRound = async (req, res) => {
  try {
    const { id } = req.params
    const round = await Round.findById(id).populate('users')

    if (round) {
      console.log(round)
      res.status(201).json(round)
    } else {
      res.status(404).json({ message: "Round not found" })
    }
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
    res.status(200).json(round)
  })
}

module.exports = {
  getRounds,
  getRound,
  // createRound,
  updateRound
}