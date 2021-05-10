const Round = require('../models/round')
const db = require('../db/connection')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))



module.exports = {
  getRounds,
  getRound
}