const Product = require("../models/productModel");
const User = require("../models/userModel");
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

  fetchByName = asyncHandler(async (req, res) => {
    const { name } = req.query;
    try {
      console.log(name, "k xa name ma ");
      const products = await Product.find({
        name: { $regex: new RegExp(name, "i") }, // Case-insensitive search
      });
      if (products.length > 0) {
        res.status(200).json(products);
      } else {
        res
          .status(404)
          .json({ message: "No products found with the given name" });
      }
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

  recommendTopRatedProducts = asyncHandler(async (req, res) => {
    try {
      const products = await Product.find({});
      const sortedProducts = this.mergeSort(products, "name");
      console.log(sortedProducts, "mero sorted product from database");
      res.json({ products: sortedProducts });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  recommendUserBasedProducts = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    try {
      const users = await User.find({});
      const products = await Product.find({});

      const userRatings = {};
      users.forEach((user) => {
        userRatings[user._id] = {};
        products.forEach((product) => {
          product.reviews.forEach((review) => {
            if (review.user.toString() === user._id.toString()) {
              userRatings[user._id][product._id] = review.rating;
            }
          });
        });
      });

      console.log("User Ratings:", userRatings);

      const targetUserRatings = userRatings[userId];
      if (!targetUserRatings) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      console.log("Target User Ratings:", targetUserRatings);

      const similarities = users
        .filter((user) => user._id.toString() !== userId)
        .map((user) => {
          const similarity = this.calculateSimilarity(
            targetUserRatings,
            userRatings[user._id]
          );
          return {
            userId: user._id,
            similarity,
          };
        })
        .sort((a, b) => b.similarity - a.similarity);

      console.log("Similarities:", similarities);

      const topSimilarUsers = similarities.slice(0, 5);

      console.log("Top Similar Users:", topSimilarUsers);

      const recommendations = {};
      topSimilarUsers.forEach(({ userId: similarUserId, similarity }) => {
        const similarUserRatings = userRatings[similarUserId];
        for (const productId in similarUserRatings) {
          if (!targetUserRatings[productId]) {
            if (!recommendations[productId]) {
              recommendations[productId] = { total: 0, count: 0 };
            }
            recommendations[productId].total +=
              similarUserRatings[productId] * similarity;
            recommendations[productId].count += similarity;
          }
        }
      });

      console.log("Recommendations:", recommendations);

      const recommendedProducts = Object.keys(recommendations)
        .map((productId) => ({
          productId,
          score:
            recommendations[productId].total / recommendations[productId].count,
        }))
        .sort((a, b) => b.score - a.score)
        .map((rec) =>
          products.find((product) => product._id.toString() === rec.productId)
        );

      console.log("Recommended Products:", recommendedProducts);

      res.json({ products: recommendedProducts });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  calculateSimilarity(userRatings1, userRatings2) {
    const commonRatings = [];
    for (const productId in userRatings1) {
      if (userRatings2[productId]) {
        commonRatings.push({
          rating1: userRatings1[productId],
          rating2: userRatings2[productId],
        });
      }
    }

    console.log("Common Ratings:", commonRatings);

    if (commonRatings.length === 0) return 0;

    const sum1 = commonRatings.reduce((sum, r) => sum + r.rating1, 0);
    const sum2 = commonRatings.reduce((sum, r) => sum + r.rating2, 0);

    const sum1Sq = commonRatings.reduce((sum, r) => sum + r.rating1 ** 2, 0);
    const sum2Sq = commonRatings.reduce((sum, r) => sum + r.rating2 ** 2, 0);

    const pSum = commonRatings.reduce(
      (sum, r) => sum + r.rating1 * r.rating2,
      0
    );

    const num = pSum - (sum1 * sum2) / commonRatings.length;
    const den = Math.sqrt(
      (sum1Sq - sum1 ** 2 / commonRatings.length) *
        (sum2Sq - sum2 ** 2 / commonRatings.length)
    );

    console.log(
      "Sum1:",
      sum1,
      "Sum2:",
      sum2,
      "Sum1Sq:",
      sum1Sq,
      "Sum2Sq:",
      sum2Sq,
      "PSum:",
      pSum,
      "Num:",
      num,
      "Den:",
      den
    );

    if (den === 0) return 0;

    return num / den;
  }
}

module.exports = ProductController;
