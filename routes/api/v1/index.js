const express = require("express");
const router = express.Router();
const postsApi = require('../../../controllers/api/v1/posts_api');

router.get('/posts',postsApi.index);
router.delete('/posts/:id',postsApi.destroy)

module.exports = router;