const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: {
        type: String,
        required: true,
        validate: {
          validator: function (value) {
            return !/\d/.test(value); // Check if city does not contain any numbers
          },
          message: "City must not contain any numbers",
        },
      },
      phone: {
        type: String,
        required: true,
        validate: {
          validator: function (value) {
            return /^(97|98)\d{8}$/.test(value); // Check if postalCode starts with 97 or 98 and has a length of 10
          },
          message: "Number must start with 97 or 98 and have a length of 10",
        },
      },
      //   country: {
      //     type: String,
      //     required: true,
      //     validate: {
      //       validator: function (value) {
      //         return !/\d/.test(value);
      //       },
      //       message: "Country must not contain any numbers",
      //     },
      //   },
    },
    paymentMethod: {
      type: String,
      required: true,
    },

    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
