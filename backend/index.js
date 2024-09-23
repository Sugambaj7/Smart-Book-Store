const express = require("express");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
const app = express();

connectDB();

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
