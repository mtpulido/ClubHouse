const Group = require("../models/group");
const db = require("../db/connection");
const User = require("../models/user");

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

const getGroups = async (req, res) => {
  try {
    const group = await Group.find({ name: req.body.name });
    if (group.length > 0) {
      res.status(201).json(group);
    } else {
      res
        .status(400)
        .json({ error: "-Group does not exist. Search is case sensitive." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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

    if (req.file) {
      group.avatar = req.file.filename;
    }
    await group.save();

    user.groups.push(group);
    await user.save();

    res.status(201).json(user);
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
const requestGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    const user = res.locals.authorizedUser;

    group.requests.push({
      userId: user._id,
      displayName: user.displayName,
      avatar: user.avatar,
    });
    await group.save();
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const groupRequestAction = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    const user = await User.findById(req.body.userId);

    if (req.body.decision === "accept") {
      group.members.push(req.body.userId);
      user.groups.push(group);
      await user.save();
    }

    const newRequests = group.requests.filter((userRequest, index) => {
      return !user._id.equals(userRequest.userId);
    });

    group.requests = newRequests;
    console.log(group.requests);
    await group.save();
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editGroupSettings = async (req, res) => {
  try {
    let group = await Group.findById(req.params.id);

    group.name = req.body.name;
    group.isOpen = req.body.isOpen;
    if (req.file) {
      group.avatar = req.file.filename;
    }
    await group.save();
    res.status(201).json(group);
  } catch (error) {
    const errors = handleErrors(error);
    res.status(500).json({ errors });
  }
};

module.exports = {
  getGroup,
  createGroup,
  deleteGroup,
  requestGroup,
  getGroups,
  groupRequestAction,
  editGroupSettings,
};
