const express = require("express");
const userRouter = express.Router();
const UserController = require("../controller/UserController");


const UserInstance = new UserController();

userRouter.post("/register", UserInstance.Signup);
userRouter.post("/login", UserInstance.Login);

module.exports = userRouter;
