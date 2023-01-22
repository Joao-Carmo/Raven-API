const utilities = require('../utilities/utilities.js')
const db = require("../models/index.js");
const bcrypt = require('bcrypt');
const Category = db.category;
const { Op } = require("sequelize");



exports.create = async (req, res) => {
  try {
    let category = await Category.findOne({ where: { name: req.body.name } });
    if (category) {
      return res.status(400).json({ message: "That category already exists." });
    }
    else{
        category = await Category.create({
            name: req.body.name,
        });
        return res.json({ message: `Category ${category.name} registered successfully` });        
    }
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
      // try to find the tutorial, given its ID
      let categories = await Category.findAll();

      res.status(200).json({
          success: true, categories: categories
      });
  }
  catch (err) {
      res.status(500).json({
          success: false, msg: err.message || `Some error occurred while retrieving all attractions`
      })
  }
};