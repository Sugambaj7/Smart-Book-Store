const express = require("express");
const userRouter = express.Router();
const RegisterController = require("../controller/RegisterController");

const RegisterInstance = new RegisterController();

userRouter.post("/register", RegisterInstance.Signup);

module.exports = userRouter;
