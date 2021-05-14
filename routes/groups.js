const { Router } = require("express");
const controllers = require("../controllers/groups");
const { checkAuthentication, adminAuthorization } = require("../middleware/requireAuth")

const router = Router();

router.get("/", controllers.getGroups);
router.get("/:id", controllers.getGroup);
router.post("/", checkAuthentication, controllers.createGroup); // need checkAuthentication
router.put("/:id", controllers.editGroup);
router.delete("/:id", adminAuthorization, controllers.deleteGroup); // need adminAuthorization

module.exports = router;
