const { Router } = require("express");
const controllers = require("../controllers/rounds");
const { checkAuth } = require("../middleware/requireAuth")

const router = Router();

router.get("/", controllers.getRounds);
router.get("/:id", controllers.getRound);
router.put("/:id", checkAuth, controllers.updateRound);
router.post("/", checkAuth, controllers.createRound);

module.exports = router;
