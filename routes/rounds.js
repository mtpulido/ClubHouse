const { Router } = require("express");
const controllers = require("../controllers/rounds");

const router = Router();

router.get("/", controllers.getRounds);
router.get("/:id", controllers.getRound);
// router.post("/", controllers.createRound);
// router.put("/:id", controllers.updateRound);
// router.delete("/:id", controllers.deleteRound);

module.exports = router;
