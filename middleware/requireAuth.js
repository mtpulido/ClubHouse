const jwt = require("jsonwebtoken");
const User = require("../models/user");
const TOKEN_KEY = "as983zZ2?AKS4rhv3218isjTSK3!82ksfH1ks29sj/df3kjsh34+bsSD-jeB21k";

const checkAuth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    jwt.verify(token, TOKEN_KEY, (err, decodedToken) => {
      if (err) {
        res.status(403).json({ error: "Must be logged in" });
      } else {
        let user = await User.findById(decodedToken.payload.id)
        res.locals.user = user
        // req.user = user
        next();
      }
    });
  } else {
    res.status(403).json({ error: "Must be logged in" });
  }
};


// //check current user
// const checkUser = (req, res, next) => {
//   const token = req.headers.authorization.split(" ")[1];

//   if (token) {
//     jwt.verify(token, TOKEN_KEY, async (err, decodedToken) => {
//       if (err) {
//         console.log(err.message)
//         res.locals.user = null
//         // res.status(403).json({ error: "Unauthorized" });
//         next()
//       } else {
//         console.log(decodedToken)
//         let user = await User.findById(decodedToken.payload.id)
//         res.locals.user = user
//         next()
//       }
//     });
//   } else {
//     res.locals.user = null
//     next()
//   }
// }

module.exports = { checkAuth }
