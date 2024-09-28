const express = require("express");
const userRouter = express.Router();
const UserController = require("../controller/UserController");


const UserInstance = new UserController();

userRouter.post("/register", UserInstance.Signup);
userRouter.post("/login", UserInstance.Login);
userRouter.get("/fetchuserlist", UserInstance.fetchuserlist);
userRouter.delete("/delete/:id", UserInstance.deleteUser);

module.exports = userRouter;
