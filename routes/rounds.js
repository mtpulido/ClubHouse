const { Router } = require("express");
const controllers = require("../controllers/rounds");
const { checkAuthentication, roundAuthorization } = require("../middleware/requireAuth")

const router = Router();

router.get("/", controllers.getRounds);
router.get("/:id", controllers.getRound);
router.put("/:id", roundAuthorization, controllers.updateRound); // roundAuthorization
router.post("/", checkAuthentication, controllers.createRound); //need checkAuthentication

module.exports = router;
