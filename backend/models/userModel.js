const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 8,
      validate: {
        validator: function (value) {
          return !/\d/.test(value); // Check if the name contains any numbers
        },
        message: "Name must not contain any numbers",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,

      validate: {
        validator: function (value) {
          return validator.isEmail(value); // Check if the email is valid
        },
        message: "Invalid email address",
      },
    },
    password: {
      type: String,
      required: true,
    },

    confirmPassword: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  if (this.password !== this.confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  this.confirmPassword = undefined;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
