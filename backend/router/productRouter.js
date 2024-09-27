const express = require("express");
const productRouter = express.Router();
const ProductController = require("../controller/ProductController.js");
const multer = require("multer");
const path = require("path");

const ProductInstance = new ProductController();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

productRouter.post(
  "/create",
  upload.single("image"),
  ProductInstance.createProduct
);
productRouter.get("/fetchProducts", ProductInstance.fetchProducts);
productRouter.put(
  "/updateProduct/:product_id",
  upload.single("image"),
  ProductInstance.updateProduct
);
productRouter.delete(
  "/deleteProduct/:product_id",
  ProductInstance.deleteProduct
);
productRouter.get("/fetchProductsByName", ProductInstance.fetchByName);
productRouter.get("/:product_id", ProductInstance.fetchIndividualProduct);
productRouter.post("/review/:product_id", ProductInstance.createProductReview);
productRouter.get("/", ProductInstance.recommendProducts);
productRouter.get(
  "/recommendUserBasedProducts/:userId",
  ProductInstance.recommendUserBasedProducts
);
// productRouter.get(
//   "/top_rated_products",
//   ProductInstance.recommendTopRatedProducts
// );

module.exports = productRouter;
