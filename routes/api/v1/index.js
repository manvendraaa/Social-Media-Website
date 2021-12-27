const express = require("express");
const router = express.Router();
const postsApi = require('../../../controllers/api/v1/posts_api');
const passport = require('passport');
router.get('/posts',postsApi.index);
router.delete('/posts/:id', passport.authenticate('jwt',{session:false}) ,postsApi.destroy)
router.use('/users', require('./users'));

module.exports = router;