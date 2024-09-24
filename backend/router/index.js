const express = require("express");
const userRouter = require("./userRouter");

const webRouter = express.Router();

webRouter.get("/", function (req, res) {
  res.send("Hello World");
});
webRouter.use("/user", userRouter);

module.exports = webRouter;
