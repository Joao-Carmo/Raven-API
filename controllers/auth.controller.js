const utilities = require('../utilities/utilities.js')
const db = require("../models/index.js");
const bcrypt = require('bcrypt');
const User = db.user;
const { Op } = require("sequelize");


exports.login = async (req, res) => {
    try {
      let user = await User.findOne({ where: { username: req.body.username } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (passwordIsValid) {
          utilities.generateToken({user: req.body.username}, (token) => {
              res.status(200).json(token); 
          })
      }
      else {
          res.status(401).send("Invalid password"); 
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };