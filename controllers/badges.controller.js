const utilities = require('../utilities/utilities.js')
const db = require("../models/index.js");
const bcrypt = require('bcrypt');
const User = db.user;
const Badge = db.badge;
const { Op } = require("sequelize");

exports.create = async (req, res) => {
    try {
        let badge = await Badge.findOne({ where: { name: req.body.name } });

        if (badge) {
            return res.status(400).json({ message: "That badge already exists." });
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

exports.getAll = async (req, res) => {
  try {
      // try to find the tutorial, given its ID
      let badges = await Badge.findAll();

      res.status(200).json({
          success: true, badges: badges
      });
  }
  catch (err) {
      res.status(500).json({
          success: false, msg: err.message || `Some error occurred while retrieving all attractions`
      })
  }
};