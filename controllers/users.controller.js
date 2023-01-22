const utilities = require('../utilities/utilities.js')
const db = require("../models/index.js");
const bcrypt = require('bcrypt');
const User = db.user;
const { Op } = require("sequelize");
const cloudinary  = require('../config/cloudinary.config.js');
const fs = require("fs");
const { provisioning } = require('../config/cloudinary.config.js');

exports.register = async (req, res) => {
    
  try {
    let user = await User.findOne({ where: { username: req.body.username } });
    let user_image = null;
        if(!req.file){
            return res.status(404).json({ message: "file can't be empty" });
            //user_image = await cloudinary.uploader.upload(req.file.path); //cloudinary pk lo utiliza?
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
            image: fs.readFileSync("./uploads/" + req.file.filename)
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

        var img = ""
        users.forEach(user => {
            if(user.email == "dudu@hotmail.com" ) {
                img = Buffer.from(user.image);
            }
        
        });


        
        res.writeHead(200, {
            'Content-Type': 'image/jpg',
            'Content-Length': img.length
          });
          res.end(img);


        /*res.status(200).json({
            success: true, users: users
        });*/
    }
    catch (err) {
        res.status(500).json({
            success: false, msg: err.message || `Some error occurred while retrieving all users`
        })
    }
  };


exports.updatePassword = async (req, res) => {
    try{
        if(req.loggedUser !== req.params.email){
            return res.status(400).json({ success: false, msg: "User not allowed" });
        }
        User.update({
            password: bcrypt.hashSync(req.body.password, 10)
        }, { where: { email: req.loggedUser } });
        return res.status(200).json({ success: true, msg: 'Password was successfully changed.'});
    }
    catch(err){
        if(err instanceof ValidationError)
            return res.status(400).json({ success: false, msg: err.errors.map(e => e.message) });
        else
            return res.status(500).json({ success: false, msg: err.message || "An error occurred."});
    }
}

exports.updateProfile = async (req, res) => {
    try{
        if(req.loggedUser !== req.params.email){
            return res.status(400).json({ success: false, msg: "User not allowed" });
        }
        if (!req.body) {
            return res.status(400).json({ success: false, msg: "No changes made"})
        }
        User.update({ where: { email: req.loggedUser } });
        return res.status(200).json({ success: true, msg: 'Password was successfully changed.'});
    }
    catch(err){
        if(err instanceof ValidationError)
            return res.status(400).json({ success: false, msg: err.errors.map(e => e.message) });
        else
            return res.status(500).json({ success: false, msg: err.message || "An error occurred."});
    }
}