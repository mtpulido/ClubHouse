const { Router } = require("express");
const controllers = require("../controllers/rounds");

const router = Router();

router.get("/", controllers.getRounds);
router.get("/:id", controllers.getRound);
router.put("/:id", controllers.updateRound);

module.exports = router;
