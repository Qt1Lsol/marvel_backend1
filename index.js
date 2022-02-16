const express = require("express");
const formidable = require("express-formidable");
// const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(formidable());

// mongoose.connect("mongodb://localhost/projet-signup");

// const userRoutes = require("./routes/user");
const personageRoutes = require("./routes/personage");
const comicsRoutes = require("./routes/comics");

// app.use(userRoutes);
app.use(personageRoutes);
app.use(comicsRoutes);

// app.get("/user", (req, res) => {
//   res.status(200).json("Welcome to the personage page");
// });

app.get("/personage", (req, res) => {
  res.status(200).json("Welcome to the personage page");
});

app.get("/comics", (req, res) => {
  res.status(200).json("Welcome to the comics page");
});

app.all("*", (req, res) => {
  res.status(404).json({ error: "Page not found" });
});

app.listen(4000, () => {
  console.log("Server started");
});
