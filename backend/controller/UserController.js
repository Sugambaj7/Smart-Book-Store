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
      res.status(401).json({ message: "Invalid email or password" });
      throw new Error("Invalid email or password");
    }
  });

  fetchuserlist = asyncHandler(async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      await user.remove();
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findById(id);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      await User.findByIdAndDelete(id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  updateUserEmailAndPassword = asyncHandler(async (req, res) => {
    const { user_id } = req.params;
    const { email, password, confirmPassword } = req.body;

    try {
      const user = await User.findById(user_id);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      user.email = email;
      user.password = password;
      user.confirmPassword = confirmPassword;

      await user.save();
      res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
}

module.exports = UserController;
