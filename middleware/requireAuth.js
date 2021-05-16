const jwt = require("jsonwebtoken");
const Group = require("../models/group");
const User = require("../models/user");
const TOKEN_KEY = require("../secrets")

const checkAuthentication = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    jwt.verify(token, TOKEN_KEY, async (err, decodedToken) => {
      if (err) {
        return res.status(403).json({ error: "Must be logged in" });
      } else {
        console.log(decodedToken)
        let user = await User.findById(decodedToken.payload.id)
        console.log(user)
        res.locals.authorizedUser = user
        next();
      }
    });
  } else {
    res.status(403).json({ error: "Must be logged in" });
  }
};

const adminAuthorization = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    jwt.verify(token, TOKEN_KEY, async (err, decodedToken) => {
      if (err) {
        return res.status(403).json({ error: "Must be logged in" });
      }
      let user = await User.findById(decodedToken.payload.id);
      let group = await Group.findById(req.params.id);

      if (user._id !== group.admin.id) {
        res.status(403).json({ error: "Not authorized" });
      } else {
        res.locals.authorizedUser = user;
        next();
      }
    });
  } else {
    res.status(403).json({ error: "Must be logged in" });
  }
};


module.exports = { checkAuthentication, adminAuthorization };
