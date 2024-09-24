const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

class RegisterController {
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
}

module.exports = RegisterController;
