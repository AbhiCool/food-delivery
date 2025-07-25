const express = require("express");
const router = express.Router();

const pizzaController = require("../controllers/pizza.controller");

router.get("/getpizzas", pizzaController.getPizzas);

module.exports = router;
