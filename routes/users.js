const { Router } = require("express");
const controllers = require("../controllers/users");
const { checkAuthentication } = require("../middleware/requireAuth")
const {uploadPhoto, resizeUserPhoto} = require("../middleware/imageUpload")

const router = Router();

router.post("/sign-up", controllers.signUp);
router.post("/sign-in", controllers.signIn);
router.get("/verify", controllers.verify);
router.get("/:id", controllers.getUser)
router.put("/add-round", checkAuthentication, controllers.addRound)
router.put("/edit-round", checkAuthentication, controllers.editRound)
router.put("/edit-avatar", checkAuthentication, uploadPhoto, resizeUserPhoto, controllers.editAvatar)


module.exports = router;
