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

  updateProduct = asyncHandler(async (req, res) => {
    const { product_id } = req.params;
    const { name, price, category, countInStock, description } = req.body;
    const image = req.file;

    // console.log(image, "backend ma image");
    // console.log(product_id, req.body, "backend ma body");

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

    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        product_id,
        {
          name,
          price,
          category,
          countInStock,
          description,
          image: image.path,
        },
        { new: true }
      );

      if (!updatedProduct) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  deleteProduct = asyncHandler(async (req, res) => {
    const { product_id } = req.params;

    try {
      const product = await Product.findById(product_id);

      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      await Product.findByIdAndDelete(product_id);
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(400).json({ message: error.message });
    }
  });

  fetchIndividualProduct = asyncHandler(async (req, res) => {
    const { product_id } = req.params;
    try {
      const product = await Product.findById(product_id);
      if (product) {
        console.log("product from database", product);
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  createProductReview = asyncHandler(async (req, res) => {
    const { product_id } = req.params;
    const { userInfo, ...reviewData } = req.body;

    console.log(userInfo, reviewData, "reviewData from backend controller");

    const rating = reviewData.rating;
    const comment = reviewData.comment;
    const user_id = userInfo._id;
    const user_name = userInfo.name;

    try {
      const product = await Product.findById(product_id);
      if (product) {
        const review = {
          rating: Number(rating),
          comment: comment,
          user: user_id,
          name: user_name,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
          product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          product.reviews.length;

        await product.save();
        res.status(201).json({ message: "Review added" });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
}

module.exports = ProductController;
