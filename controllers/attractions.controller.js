const utilities = require('../utilities/utilities.js')
const db = require("../models/index.js");
const bcrypt = require('bcrypt');
const Attraction = db.attraction;
const { Op } = require("sequelize");
const cloudinary  = require('../config/cloudinary.config.js');

exports.create = async (req, res) => {
    try {
      let attraction = await Attraction.findOne({ where: { name: req.body.name } });
      const upload = await cloudinary.uploader.upload(req.file.path);

      if (attraction) {
        return res.status(400).json({ message: "That attraction already exists." });
      }
      else{
          attraction = await Attraction.create({
                name: req.body.name,
                address: req.body.address,
                description: req.body.description,
                image: upload.url,
                longitude: req.body.longitude,
                latitude: req.body.latitude,
          });
          return res.json({ message: `Attraction ${attraction.name} registered successfully` });        
      }
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

exports.getAll = async (req, res) => {
    try {
        // try to find the tutorial, given its ID
        let attractions = await Attraction.findAll();

        res.status(200).json({
            success: true, attractions: attractions
        });
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: err.message || `Some error occurred while retrieving all attractions`
        })
    }
};