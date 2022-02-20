const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

router.get("/comics/:id", (req, res) => {
  const getComics = async () => {
    console.log(req.params.id);
    console.log("tests");

    try {
      const response = await axios.get("https://marvelbackendqt1.herokuapp.com/comics/" + req.params.id + "?apiKey=" + process.env.MARVEL_KEY
      );
      console.log(response.data);
      console.log("https://lereacteur-marvel-api.herokuapp.com/comics/" + req.params.id + "?apiKey=" + process.env.MARVEL_KEY);
      res.status(200).json(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  getComics();
});

module.exports = router;
