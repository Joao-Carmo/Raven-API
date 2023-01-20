const express = require('express');
const router = express.Router();
const { validationResult, body, param } = require("express-validator");
const userController = require('../controllers/users.controller.js')
const authController = require('../controllers/auth.controller.js')
const multer = require('multer');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now())
    }
});

const mutlerUploads = multer({storage}).single('image');


router.route('/register')
.post(mutlerUploads, userController.register)

router.route('/')
.get(userController.getAll)

// .patch(
//     (req, res) => {
//         const errors = validationResult(req);
//         if (errors.isEmpty()) {
//             userController.changePassword(req, res);
//         } else {
//             res.status(404).json({ errors: errors.array() });
//         }
//     }
// );



router.all('*', (req, res) => {
    res.status(404).json({message: 'This route does not exist!'});
})

module.exports = router;