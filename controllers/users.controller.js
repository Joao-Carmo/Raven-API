// const utilities = require('../utilities/utilities.js')
// const db = require("../models/index.js");
// const bcrypt = require('bcrypt');
// const User = db.user;
// const { Op } = require("sequelize");

// exports.register = async (req, res) => {
//   try {
//     let user = await User.findOne({ where: { email: req.body.username } });
//     if (user) {
//       return res.status(400).json({ message: "That user already exists." });
//     }
//     else{
//         user = await User.create({
//             name: req.body.name,
//             email: req.body.email,
//             password: bcrypt.hashSync(req.body.password, 4)
//         });
//         return res.json({ message: "Utilizador registado com sucesso!" });        
//     }
//   } 
//   catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };