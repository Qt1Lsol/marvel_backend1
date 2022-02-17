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

app.get("/", (req, res) => {
  res.status(200).json({ message: "check heroku" });
});

// app.use(userRoutes);
app.use(personageRoutes);
app.use(comicsRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ error: "Page not found" });
});

app.listen(3000, () => {
  console.log("Server started");
});
