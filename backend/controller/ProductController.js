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

  // fetchByName = asyncHandler(async (req, res) => {
  //   const { name } = req.query;
  //   if (name !== null) {
  //     try {
  //       console.log(name, "k xa name ma ");
  //       const products = await Product.find({
  //         name: { $regex: new RegExp(name, "i") }, // Case-insensitive search
  //       });
  //       if (products.length > 0) {
  //         res.status(200).json(products);
  //       } else {
  //         res
  //           .status(404)
  //           .json({ message: "No products found with the given name" });
  //       }
  //     } catch (error) {
  //       res.status(400).json({ message: error.message });
  //     }
  //   } else {
  //     res.status(400).json({ message: error.message });
  //   }
  // });

  fetchByName = asyncHandler(async (req, res) => {
    const { name } = req.query;
    if (name) {
      try {
        console.log(name, "k xa name ma ");
        const products = await Product.find({
          name: { $regex: name, $options: "i" }, // Case-insensitive partial string matching
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
    } else {
      res.status(400).json({ message: "Name query parameter is required" });
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

  //algo part
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

        //user given review included rating, comment, userid, and name
        product.reviews.push(review);

        //database bata product to review count gareko
        product.numReviews = product.reviews.length;

        let sumOfRatings = 0;
        for (let i = 0; i < product.reviews.length; i++) {
          //assigns rating given by different users to same product
          sumOfRatings += product.reviews[i].rating;
        }

        //average rating of product
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
      const sortedProducts = this.mergeSort(products, "name");
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

    //calculates middle index of an array
    const middle = Math.floor(arr.length / 2);

    //slices array into two halves
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

  // // Sort products by average rating in descending order
  // recommendTopRatedProducts = asyncHandler(async (req, res) => {
  //   try {
  //     const products = await Product.find({});
  //     const sortedProducts = this.sortByRating(products);
  //     res.json({ products: sortedProducts });
  //   } catch (error) {
  //     res.status(400).json({ message: error.message });
  //   }
  // });

  // // Sort products by average rating in descending order
  // sortByRating(products) {
  //   return products.sort((a, b) => b.averageRating - a.averageRating);
  // }

  recommendUserBasedProducts = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    try {
      //data collection
      const users = await User.find({});
      const products = await Product.find({});

      //rating matrix creation kun user le kun kun product lai rating deko xa
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
      //target user rating
      //retrieves ratings for target user identified by 'userId'
      //target user le kun kun product ma rate garya xa retrive hunxa
      const targetUserRatings = userRatings[userId];
      if (Object.keys(targetUserRatings).length === 0) {
        res.status(400).json({ message: "No ratings found for this user." });
        return;
      }

      console.log("Target User Ratings:", targetUserRatings);

      //similarity calculation with the help of calculate similarity method
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

      const topSimilarUsers = similarities.slice(0, 3);

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

    const num = pSum - (sum1 * sum2) / commonRatings.length; //numerator
    const den = Math.sqrt(
      (sum1Sq - sum1 ** 2 / commonRatings.length) *
        (sum2Sq - sum2 ** 2 / commonRatings.length)
    ); //denumerator

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

  // Fetch all products and return the top-rated ones
  recommendTopRatedProducts = asyncHandler(async (req, res) => {
    try {
      const products = await Product.find({});
      const productsWithAvgRating = products.map((product) => {
        const averageRating = this.calculateAverageRating(product.reviews);
        return { ...product._doc, averageRating };
      });
      const sortedProducts = this.sortByRating(productsWithAvgRating);
      res.json({ products: sortedProducts });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Calculate average rating for a product
  calculateAverageRating(reviews) {
    if (reviews.length === 0) return 0;
    const sumOfRatings = reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return sumOfRatings / reviews.length;
  }

  // Sort products by average rating in descending order
  sortByRating(products) {
    return this.mergeSort(
      products,
      (a, b) => b.averageRating - a.averageRating
    );
  }

  // Merge sort implementation
  mergeSort(arr, compare) {
    if (arr.length <= 1) {
      return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return this.merge(
      this.mergeSort(left, compare),
      this.mergeSort(right, compare),
      compare
    );
  }

  merge(left, right, compare) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (compare(left[leftIndex], right[rightIndex]) <= 0) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }

  updateCountInStock = async (req, res) => {
    const { items } = req.body;
    console.log(items, "Received items in backend");

    try {
      // Check if items is an array and has at least one item
      if (Array.isArray(items) && items.length > 0) {
        // Iterate over items and update count in stock for each item
        for (const item of items) {
          console.log(
            `Processing item with id: ${item._id} and qty: ${item.qty}`
          );
          const product = await Product.findByIdAndUpdate(
            item._id,
            { $inc: { countInStock: -item.qty } },
            { new: true }
          );
          if (product) {
            console.log(
              `Updated product with id: ${item._id}, new countInStock: ${product.countInStock}`
            );
          } else {
            console.log(`Product with id: ${item._id} not found`);
          }
        }
        res.status(200).json({ message: "Stock count updated for all items" });
      } else {
        res.status(400).json({ message: "Invalid items array" });
      }
    } catch (error) {
      console.error("Error updating stock count:", error);
      res.status(500).json({ message: error.message });
    }
  };

  // Function to preprocess text
  preprocessText(text) {
    const stopWords = new Set([
      "a",
      "an",
      "the",
      "and",
      "or",
      "but",
      "if",
      "then",
      "else",
      "when",
      "at",
      "by",
      "for",
      "with",
      "about",
      "against",
      "between",
      "into",
      "through",
      "during",
      "before",
      "after",
      "above",
      "below",
      "to",
      "from",
      "up",
      "down",
      "in",
      "out",
      "on",
      "off",
      "over",
      "under",
      "again",
      "further",
      "then",
      "once",
      "here",
      "there",
      "all",
      "any",
      "both",
      "each",
      "few",
      "more",
      "most",
      "other",
      "some",
      "such",
      "no",
      "nor",
      "not",
      "only",
      "own",
      "same",
      "so",
      "than",
      "too",
      "very",
      "s",
      "t",
      "can",
      "will",
      "just",
      "don",
      "should",
      "now",
    ]);
    return text
      .toLowerCase()
      .split(/\W+/)
      .filter((word) => word && !stopWords.has(word));
  }

  // Function to calculate term frequency (TF)
  calculateTF(tokens) {
    const tf = {};
    tokens.forEach((token) => {
      if (!tf[token]) {
        tf[token] = 0;
      }
      tf[token] += 1;
    });
    return tf;
  }

  // Function to calculate cosine similarity
  cosineSimilarity(vecA, vecB) {
    const intersection = Object.keys(vecA).filter((token) => vecB[token]);
    const dotProduct = intersection.reduce(
      (sum, token) => sum + vecA[token] * vecB[token],
      0
    );
    const magnitudeA = Math.sqrt(
      Object.values(vecA).reduce((sum, val) => sum + val * val, 0)
    );
    const magnitudeB = Math.sqrt(
      Object.values(vecB).reduce((sum, val) => sum + val * val, 0)
    );
    return dotProduct / (magnitudeA * magnitudeB);
  }

  // Function to get content-based recommendations
  async getContentBasedRecommendations(productId) {
    const products = await Product.find(); // Fetch all products
    const targetProduct = products.find(
      (product) => product._id.toString() === productId
    );

    if (!targetProduct) {
      throw new Error("Product not found");
    }

    const targetTokens = this.preprocessText(targetProduct.description);
    const targetTF = this.calculateTF(targetTokens);

    const similarities = products.map((product) => {
      if (product._id.toString() === productId) return -1; // Skip the target product itself
      const tokens = this.preprocessText(product.description);
      const tf = this.calculateTF(tokens);
      return this.cosineSimilarity(targetTF, tf);
    });

    const recommendedProducts = products
      .map((product, index) => ({ product, similarity: similarities[index] }))
      .filter((item) => item.similarity > 0)
      .sort((a, b) => b.similarity - a.similarity)
      .map((item) => item.product);

    return recommendedProducts;
  }

  recommendContentBasedProducts = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    if (productId) {
      try {
        const recommendedProducts = await this.getContentBasedRecommendations(
          productId
        );
        if (recommendedProducts.length > 0) {
          res.status(200).json(recommendedProducts);
        } else {
          res.status(404).json({ message: "No recommended products found" });
        }
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    } else {
      res.status(400).json({ message: "Product ID parameter is required" });
    }
  });
}

module.exports = ProductController;
