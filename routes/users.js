const express = require("express");
const usersController = require("../controllers/users_controller");
const router = express.Router();
const passport = require('passport');

//show profile only when authenticated user
router.get("/profile",passport.checkAuthentication, usersController.profile);
router.get('/sign-in',usersController.signIn);
router.get('/sign-up',usersController.signUp);
router.get('/sign-out',usersController.destroySession);
router.post('/create', usersController.create);
//we use authentication here as second parameter as middleware
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
    ) ,usersController.createSession);


module.exports = router;
