const Analysis = require('../models/analysis')
const db = require('../db/connection')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))








module.exports = {
  getAnalysis,
  getOneAnalysis
}