const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const blogsRouter = require("./controllers/blogs");

const app = express();

mongoose.connect(config.MONGODB_URI, { family: 4 });

app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use((error, req, res, next) => {
  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
});

module.exports = app;
