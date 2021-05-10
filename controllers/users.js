const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const db = require("../db/connection");

db.on("error", console.error.bind(console, "MongoDB connection error:"));



module.exports = {
  signUp,
  signIn,
  verify,
  changePassword,
};
