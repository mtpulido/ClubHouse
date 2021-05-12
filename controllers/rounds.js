const Round = require('../models/round')
const db = require('../db/connection')
const round = require('../models/round')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const getRounds = async (req, res) => {
  try {
    const rounds = await Round.find()
    res.json(rounds)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getRound = async (req, res) => {
  try {
    const { id } = req.params
    const round = await Round.findById(id)

    if (round) {
      res.json(round)
    }
    res.status(404).json({ message: "Round not found"})
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createRound = async (req, res) => {
  try {
    const Round = await new Round(req.body)
    await round.save()
    res.status(201).json(round)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const editRound = async (req, res) => {
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
  createRound,
  editRound
}