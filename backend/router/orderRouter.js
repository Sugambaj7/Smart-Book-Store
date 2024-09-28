const express = require("express");
const orderRouter = express.Router();
const OrderController = require("../controller/OrderController.js");

const OrderInstance = new OrderController();

orderRouter.get("/", OrderInstance.getAllOrder);
orderRouter.get("/viewOrder/:order_id", OrderInstance.getOrderById);
orderRouter.get("/:user_id", OrderInstance.getMyRecentOrder);
orderRouter.post("/create", OrderInstance.CreateOrder);
orderRouter.put("/update/:order_id", OrderInstance.updateDeliveryAndPaidStatus);

module.exports = orderRouter;
