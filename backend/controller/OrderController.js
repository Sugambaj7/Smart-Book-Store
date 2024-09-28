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

  getAllOrder = asyncHandler(async (req, res) => {
    try {
      const orders = await Order.find({});
      if (orders.length > 0) {
        res.status(200).json(orders);
      } else {
        res.status(404).json({ message: "No orders found" });
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(400).json({ message: error.message });
    }
  });

  updateDeliveryAndPaidStatus = asyncHandler(async (req, res) => {
    const { order_id } = req.params;
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        order_id,
        {
          $set: {
            isPaid: true,
            isDelivered: true,
          },
        },
        { new: true }
      );

      if (updatedOrder) {
        res
          .status(200)
          .json({ message: "Order updated successfully", order: updatedOrder });
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      res.status(400).json({ message: error.message });
    }
  });

  getOrderByUserId = asyncHandler(async (req, res) => {
    const { user_id } = req.params;
    console.log(user_id, "req.params");
    try {
      const orders = await Order.find({ user: user_id });
      if (orders.length > 0) {
        res.status(200).json(orders);
      } else {
        res.status(404).json({ message: "No orders found for this user" });
      }
    } catch (error) {
      console.error("Error fetching orders by user ID:", error);
      res.status(400).json({ message: error.message });
    }
  });

  getOrderById = asyncHandler(async (req, res) => {
    const { order_id } = req.params;
    try {
      const order = await Order.findById(order_id);
      if (order) {
        res.status(200).json(order);
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
