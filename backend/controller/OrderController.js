const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel.js");

class OrderController {
  CreateOrder = asyncHandler(async (req, res) => {
    const {
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    console.log(req.body, "Received order data");

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
      return;
    } else {
      try {
        const order = new Order({
          user: req.body.user._id,
          orderItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
      } catch (error) {
        console.error("Error saving order:", error);
        res.status(400).json({ message: error.message });
      }
    }
  });

  getMyRecentOrder = asyncHandler(async (req, res) => {
    const { user_id } = req.params;
    try {
      const order = await Order.findOne({ user: user_id }).sort({
        createdAt: -1,
      });
      if (order) {
        res.status(200).json(order);
        console.log(order, "order from order controller");
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(400).json({ message: error.message });
    }
  });
}

module.exports = OrderController;
