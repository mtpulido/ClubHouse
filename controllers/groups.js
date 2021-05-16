const Group = require("../models/group");
const db = require("../db/connection");
const { addJustCreatedGroup } = require("./users");
const user = require("../models/user");

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const handleErrors = (err) => {
  let errors = {};

  // validation errors create group
  if (err.message.includes("groups validation failed")) {
    Object.values(err.errors).forEach((error) => {
      errors[error.properties.path] = error.properties.message;
    });
  }
  return errors;
};


const getGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await Group.findById(id).populate({
      path: "members",
      select: { passwordDigest: 0, groups: 0 },
    });

    if (group) {
      return res.status(201).json(group);
    } else {
      res.status(404).json({ message: "Group not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createGroup = async (req, res) => {
  try {
    let user = res.locals.authorizedUser;
    const group = await new Group(req.body);

    group.members.push(user);
    group.admin = {
      email: user.email,
      id: user._id,
      displayName: user.displayName,
    };
    await group.save();

    res.status(201).json(group);
    addJustCreatedGroup(user, group);
  } catch (error) {
    const errors = handleErrors(error);
    res.status(500).json({ errors });
  }
};

const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Group.findByIdAndDelete(id);
    if (deleted) {
      return res.status(201).send("Group has been deleted");
    }
    throw new Error("Group not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//this is no where close to finished. Need to figure out the joining groups and removing from groups for members.
const editGroup = async (req, res) => {
  const group = await Group.findById(req.params.id);
  const user = await user.findById(req.body._id);
};

module.exports = {
  getGroup,
  createGroup,
  deleteGroup,
  editGroup,
};
