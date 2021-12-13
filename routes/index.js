const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");

// handling home route
router.get("/", homeController.home);
// any request to /users .USE to users.js route file
router.use("/users", require("./users"));

module.exports = router;
