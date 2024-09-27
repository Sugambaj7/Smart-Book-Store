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
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  updateProduct = asyncHandler(async (req, res) => {
    const { product_id } = req.params;
    const { name, price, category, countInStock, description } = req.body;
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
      res.status(400).json({ message: error.message });
    }
  });

  fetchIndividualProduct = asyncHandler(async (req, res) => {
    const { product_id } = req.params;
    try {
      const product = await Product.findById(product_id);
      if (product) {
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

        let sumOfRatings = 0;
        for (let i = 0; i < product.reviews.length; i++) {
          sumOfRatings += product.reviews[i].rating;
        }

        product.rating = sumOfRatings / product.reviews.length;

        await product.save();
        res.status(201).json({ message: "Review added" });
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  recommendProducts = asyncHandler(async (req, res) => {
    try {
      const products = await Product.find({});
      const sortedProducts = this.mergeSort(products, "name"); // Use 'this' to call the method
      console.log(sortedProducts, "mero sorted product from database");
      res.json({ products: sortedProducts });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  mergeSort(arr, sortBy) {
    if (arr.length <= 1) {
      return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const leftHalf = arr.slice(0, middle);
    const rightHalf = arr.slice(middle);

    const sortedLeft = this.mergeSort(leftHalf, sortBy); // Use 'this' to call the method
    const sortedRight = this.mergeSort(rightHalf, sortBy); // Use 'this' to call the method

    return this.merge(sortedLeft, sortedRight, sortBy); // Use 'this' to call the method
  }

  merge(leftArr, rightArr, sortBy) {
    let sortedArr = [];
    let leftIdx = 0;
    let rightIdx = 0;

    while (leftIdx < leftArr.length && rightIdx < rightArr.length) {
      if (leftArr[leftIdx][sortBy] <= rightArr[rightIdx][sortBy]) {
        sortedArr.push(leftArr[leftIdx]);
        leftIdx++;
      } else {
        sortedArr.push(rightArr[rightIdx]);
        rightIdx++;
      }
    }

    while (leftIdx < leftArr.length) {
      sortedArr.push(leftArr[leftIdx]);
      leftIdx++;
    }

    while (rightIdx < rightArr.length) {
      sortedArr.push(rightArr[rightIdx]);
      rightIdx++;
    }

    return sortedArr;
  }
}

module.exports = ProductController;
