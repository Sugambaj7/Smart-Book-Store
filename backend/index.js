const path = require("path");
const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const webRouter = require("./router/index.js");

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(webRouter);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
// console.log(path.join(__dirname, "/uploads"));

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});
