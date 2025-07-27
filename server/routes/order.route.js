const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/placeorder", isAuthenticated, orderController.placeOrder);

router.get("/getorders", isAuthenticated, orderController.getOrders);

module.exports = router;
