const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return !/\d/.test(value); // Check if the name contains any numbers
        },
        message: "Name must not contain any numbers",
      },
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return !/\d/.test(value); // Check if the category contains any numbers
        },
        message: "Category must not contain any numbers",
      },
    },
    description: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return !/\d/.test(value); // Check if the description contains any numbers
        },
        message: "Description must not contain any numbers",
      },
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
