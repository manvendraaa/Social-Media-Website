const express = require("express");
const usersController = require("../controllers/users_controller");
const router = express.Router();

router.get("/profile", usersController.profile);
router.get('/sign-in',usersController.signIn);
router.get('/sign-up',usersController.signUp);

module.exports = router;
