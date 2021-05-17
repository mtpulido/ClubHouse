const jwt = require("jsonwebtoken");
const User = require("../models/user");
const db = require("../db/connection");
const TOKEN_KEY = require("../secrets");

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const handleErrors = (err) => {
  let errors = { displayName: "", email: "", passwordDigest: "" };
  // incorrect email login
  if (err.message === "incorrect email") {
    errors.email = "Email not registered";
  }
  // incorrect password login
  if (err.message === "incorrect password") {
    errors.passwordDigest = "Password is incorrect";
  }
  //duplicate email signup
  if (err.code === 11000) {
    errors.email = "Email already in use";
    return errors;
  }
  // non number entered into required number field.
  if (err.message.includes("Cast to Number")) {
    Object.values(err.errors).forEach((error) => {
      errors[error.path] = `${error.path} requires a number`;
    });
    return errors;
  }
  // validation errors signup
  if (err.message.includes("users validation failed")) {
    Object.values(err.errors).forEach((error) => {
      errors[error.properties.path] = error.properties.message;
    });
  }
  return errors;
};

const signUp = async (req, res) => {
  try {
    const { displayName, email, password } = req.body;
    const passwordDigest = password;
    const user = await User.create({ displayName, email, passwordDigest });
    //password hashed in models/user.js
    const payload = {
      username: user.displayName,
      email: user.email,
      id: user._id,
    };
    const token = jwt.sign(payload, TOKEN_KEY);
    res.status(201).json({ token });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);

    const payload = {
      displayName: user.displayName,
      email: user.email,
      id: user._id,
    };

    const token = jwt.sign(payload, TOKEN_KEY);
    res.status(201).json({ token });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

const verify = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, TOKEN_KEY);
    const user = await User.findOne({ email: payload.email });
    const newPayload = {
      displayName: user.displayName,
      email: user.email,
      id: user._id,
    };
    if (payload) {
      res.json(newPayload);
    }
  } catch (error) {
    res.status(401).send("Not Authorized");
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await await User.findById(id).populate("groups");
    if (user) {
      res.status(201).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addJustCreatedGroup = async (user, group) => {
  try {
    user.groups.push(group);
    return await user.save();
  } catch (error) {
    throw error;
  }
};

const addRound = async (req, res) => {
  try {
    const user = res.locals.authorizedUser;
    const round = req.body;
    if (user.recentRounds.length === 100) {
      user.recentRounds.pop();
    }
    user.recentRounds.unshift(round);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

const editRound = async (req, res) => {
  try {
    const user = res.locals.authorizedUser;
    const round = req.body

    const index = user.recentRounds.findIndex((recentRound) => recentRound._id === round._id);
    user.recentRounds[index] = round;
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

module.exports = {
  signUp,
  signIn,
  verify,
  getUser,
  addJustCreatedGroup,
  addRound,
  editRound,
  // changePassword,
};