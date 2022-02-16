const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

router.get("/comics", (req, res) => {
  const getComics = async () => {
    try {
      const response = await axios.get(
        "https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=" +
          process.env.MARVEL_KEY
      );
      console.log(response.data);
      res.status(200).json(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  getComics();
});

module.exports = router;
