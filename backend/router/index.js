const express = require("express");
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");

const webRouter = express.Router();

webRouter.get("/", function (req, res) {
  res.send("Hello World");
});
webRouter.use("/user", userRouter);
webRouter.use("/product", productRouter);

module.exports = webRouter;
