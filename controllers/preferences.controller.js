const utilities = require('../utilities/utilities.js')
const db = require("../models/index.js");
const bcrypt = require('bcrypt');
const Preference = db.preferences;
const { Op } = require("sequelize");

exports.update = async (req, res) => {
    try {
        let preference = await Preference.findAll({ where: { userID: req.body.userID } });

        if(preference === null){
            preference = await Preference.create({
                userID: req.body.userID,
                categoryID: req.body.categoryID
            })
        } else {
            preference = await Preference.update({
                userID: req.body.userID,
                categoryID: req.body.categoryID
            });
        }
        return res.json({ message: `preferences created successfully` });   
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

exports.getAll = async (req, res) => {
    try {
        let preference = await Preference.findAll();
    
        res.status(200).json({
            success: true, preferences: preference
        });
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: err.message || `Some error occurred while retrieving all preferences`
        })
    }
};