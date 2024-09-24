const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const validator = require("validator");

class UserController {
  Signup = asyncHandler(async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    console.log(name, email, password, confirmPassword);

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const user = await User.create({
      name,
      email,
      password,
      confirmPassword,
    });

    if (user) {
      res.status(201).json({
        // _id: user._id,
        // name: user.name,
        // email: user.email,
        // isAdmin: user.isAdmin,
        // token: generateToken(user._id),
        message: "Registration Successfull!!!",
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  });

  Login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    } else if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    } else if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password should be at least 8 characters long" });
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json("Invalid email or password");
      throw new Error("Invalid email or password");
    }
  });
}

module.exports = UserController;
