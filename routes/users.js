const { Router } = require("express");
const controllers = require("../controllers/users");

const router = Router();

router.post("/sign-up", controllers.signUp);
router.post("/sign-in", controllers.signIn);
router.get("/verify", controllers.verify);
router.get("/:id/rounds", controllers.getRounds);

module.exports = router;
