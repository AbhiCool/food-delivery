const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller.js"); //userController

router.post("/register", userController.register);

router.post("/login", userController.login);

module.exports = router;
