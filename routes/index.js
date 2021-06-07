const { Router } = require("express");
const groupsRouter = require("./groups");
const usersRouter = require("./users");

const router = Router();

router.get("/", (req, res) => res.send("This is the api root!"));

router.use("/groups", groupsRouter);
router.use("/users", usersRouter);

module.exports = router;
