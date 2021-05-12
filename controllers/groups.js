const Group = require('../models/group')
const db = require('../db/connection')
const { addGroup } = require('./users')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))


const getGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate('members').populate('adminId')
    res.status(201).json(groups)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createGroup = async (req, res) => {
  try {
    let user = res.locals.user
    const group = await new Group(req.body)

    group.members.push(user)
    group.adminId = user
    await group.save()

    res.status(201).json(group)
    addGroup(user, group)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


module.exports = {
  getGroups,
  // getGroup,
createGroup
}