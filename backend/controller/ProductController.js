const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const validator = require("validator");

class ProductController {
  createProduct = asyncHandler(async (req, res) => {
    const { name, price, category, countInStock, description, user } = req.body;
    const image = req.file;

    if (
      !name ||
      !price ||
      !category ||
      !countInStock ||
      !description ||
      !image
    ) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    if (!validator.isNumeric(price.toString()) || price <= 0) {
      res.status(400).json({ message: "Price must be a positive number" });
      return;
    }

    if (!validator.isNumeric(countInStock.toString()) || countInStock < 0) {
      res
        .status(400)
        .json({ message: "Count in stock must be a non-negative number" });
      return;
    }

    const product = new Product({
      name,
      price,
      category,
      countInStock,
      description,
      image: image.path,
      user,
    });

    try {
      const createdProduct = await product.save();
      res.status(201).json(createdProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  fetchProducts = asyncHandler(async (req, res) => {
    try {
      const products = await Product.find({});
      console.log("products from database", products);
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
}

module.exports = ProductController;
