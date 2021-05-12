const { Router } = require("express");
const controllers = require("../controllers/users");

const router = Router();

router.post("/sign-up", controllers.signUp);
router.post("/sign-in", controllers.signIn);
router.get("/verify", controllers.verify);
router.get("/", controllers.getUsers);
router.put("/:id/rounds", controllers.addRound)
router.put("/:id/groups", controllers.addGroup)

module.exports = router;
