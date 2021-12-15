const express = require("express"); 
const router = express.Router();
const passport = require('passport');
const postController = require('../controllers/post_controller');

router.post('/create',passport.checkAuthentication,postController.create);
// : is used for variable part
router.get('/destroy/:id',passport.checkAuthentication, postController.destroy);
module.exports = router;