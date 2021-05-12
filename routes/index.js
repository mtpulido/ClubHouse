const { Router } = require("express");
const roundsRouter = require("./rounds");
const groupsRouter = require("./groups");
const usersRouter = require("./users");

const router = Router();

router.get("/", (req, res) => res.send("This is the api root!"));

// router.use("/rounds", roundsRouter);
// router.use("/groups", groupsRouter);
router.use("/users", usersRouter);

module.exports = router;
