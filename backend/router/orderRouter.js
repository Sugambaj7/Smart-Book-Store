const express = require("express");
const orderRouter = express.Router();
const OrderController = require("../controller/OrderController.js");

const OrderInstance = new OrderController();

orderRouter.post("/create", OrderInstance.CreateOrder);
orderRouter.get("/:user_id", OrderInstance.getMyRecentOrder);

module.exports = orderRouter;
