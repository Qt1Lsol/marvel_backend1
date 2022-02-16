const express = require("express");
const router = express.Router();

const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../models/User");

router.post("/user/signup", async (req, res) => {
  try {
    // console.log(req.fields);
    // Destructuring
    const { username, email, password } = req.fields;
    // Cette ligne revient à faire :
    // const username = req.fields.username;
    // const email = req.fields.email;
    // const description = req.fields.description;
    // const password = req.fields.password;

    // console.log(username);

    // je vérifie si il existe déjà un utilisateur avec le même nom ou le même email
    const emailUsed = await User.findOne({ email: email });
    const usernameUsed = await User.findOne({ username: username });

    if (!usernameUsed) {
      if (!emailUsed) {
        if (username && email && password) {
          const token = uid2(16);
          const salt = uid2(16);
          console.log(SHA256(password + salt));
          const hash = SHA256(password + salt).toString(encBase64);

          // Si la clef d'un objet et la variable qu'elle contient ont le même nom, je peux uniquement mentionner ce dernier pour dire mon: nom
          const newUser = new User({
            // email: email,
            // username: username,
            // description: description,
            email,
            username,
            // token: token,
            token,
            salt,
            hash,
          });
          await newUser.save();
          res.status(200).json({
            _id: newUser._id,
            email: newUser.email,
            username: newUser.username,
            token: newUser.token,
          });
        } else {
          res.status(400).json({ error: "Missing parameters" });
        }
      } else {
        res.status(400).json({ error: "This email has already been used" });
      }
    } else {
      res.status(400).json({ error: "This username has already been used" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
