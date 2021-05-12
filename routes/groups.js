const { Router } = require("express");
const controllers = require("../controllers/groups");
const { checkAuth } = require("../middleware/requireAuth")

const router = Router();

router.get("/", controllers.getGroups);
router.get("/:id", controllers.getGroup);
router.post("/", checkAuth, controllers.createGroup);
router.put("/:id", checkAuth, controllers.editGroup);
router.delete("/:id", checkAuth, controllers.deleteGroup);

module.exports = router;
