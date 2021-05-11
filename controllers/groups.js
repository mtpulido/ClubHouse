const Group = require('../models/group')
const db = require('../db/connection')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))



// module.exports = {
//   getGroups,
//   getGroup
// }