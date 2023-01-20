const utilities = require('../utilities/utilities.js')
const db = require("../models/index.js");
const bcrypt = require('bcrypt');
const Attraction = db.attraction;
const { Op } = require("sequelize");

exports.create = async (req, res) => {
    try {
      let attraction = await Attraction.findOne({ where: { name: req.body.name } });
      if (attraction) {
        return res.status(400).json({ message: "That attraction already exists." });
      }
      else{
          attraction = await Attraction.create({
                name: req.body.name,
                address: req.body.address,
                description: req.body.description,
                image: req.body.image
          });
          return res.json({ message: `Attraction ${attraction.name} registered successfully` });        
      }
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  };