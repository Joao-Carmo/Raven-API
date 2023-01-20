const utilities = require('../utilities/utilities.js')
const db = require("../models/index.js");
const bcrypt = require('bcrypt');
const User = db.user;
const { Op } = require("sequelize");
const cloudinary  = require('../config/cloudinary.config.js');


exports.register = async (req, res) => {
    
  try {
    let user = await User.findOne({ where: { username: req.body.username } });
    let user_image = null;
        if(req.file){
            user_image = await cloudinary.uploader.upload(req.file.path);
        }
    if (user) {
      return res.status(400).json({ message: "That user already exists." });
    }
    else{
        user = await User.create({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            gender: req.body.gender,
            birth_date: req.body.birth_date,
            image: user_image ? user_image.url : null,
        });
        return res.json({ message: "User registered successfully" });        
    }
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.getAll = async (req, res) => {
    try {
        // try to find the tutorial, given its ID
        let users = await User.findAll();

        res.status(200).json({
            success: true, users: users
        });
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: err.message || `Some error occurred while retrieving all users`
        })
    }
  };


exports.changePassword = async (req, res) => {
    try{
        if(req.loggedUsername !== req.body.username){
            return res.status(400).json({ success: false, msg: "User not allowed" });
        }
        if(!req.body.password){
            return res.status(400).json({ success: false, msg: "Not enough data provided" });
        }
        User.update({
            password: bcrypt.hashSync(req.body.password, 10)
        }, { where: { username: req.loggedUsername } });
        return res.status(200).json({ success: true, msg: 'Password was successfully changed.'});
    }
    catch(err){
        if(err instanceof ValidationError)
            return res.status(400).json({ success: false, msg: err.errors.map(e => e.message) });
        else
            return res.status(500).json({ success: false, msg: err.message || "An error occurred."});
    }
}

