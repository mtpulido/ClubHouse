const { Router } = require("express");
const controllers = require("../controllers/groups");
const { checkAuthentication, adminAuthorization } = require("../middleware/requireAuth")

const router = Router();

router.get("/:id", controllers.getGroup);
router.post("/add-group", checkAuthentication, controllers.createGroup); // need checkAuthentication
router.put("/edit-group/:id/", controllers.editGroup);
router.delete("/delete-group/:id", adminAuthorization, controllers.deleteGroup); // need adminAuthorization

module.exports = router;
