const utilities = require('../utilities/utilities.js')
const db = require("../models/index.js");
const bcrypt = require('bcrypt');
const User = db.user;
const bcrypt = require('bcrypt');
const Badge = db.badge;
const { Op } = require("sequelize");

exports.create = async (req, res) => {
    try {
        let badge = await Badge.findOne({ where: { name: req.body.name } });

        if (badge) {
            return res.status(400).json({ message: "That user already exists." });
          }
        badge = await Badge.create({
            name: req.body.userID,
            image: req.body.title,
            text: req.body.author,
        });
        return res.json({ message: "Badge created" }); 
    } catch (err) {
      res.status(400).json({
        message: err
      });
    }
};