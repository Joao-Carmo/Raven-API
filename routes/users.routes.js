const express = require('express');
const router = express.Router();
const { validationResult, body, param } = require("express-validator");
const userController = require('../controllers/users.controller.js')
const multer = require('multer');
const utilities = require('../utilities/utilities.js')

let storage = multer.diskStorage({});

const mutlerUploads = multer({storage: storage, limits: {fileSize: 500000}}).single('image');

router.post("/register", mutlerUploads,
    body("username").notEmpty().escape().isString(),
    body("name").notEmpty().escape().isString(),
    body("email").isEmail().notEmpty().normalizeEmail(),
    body("password").isLength({min: 5}).withMessage("Password must have at least 5 characters.").notEmpty(),
    body("gender").notEmpty().isIn(['male', 'female', 'other']).withMessage('gender must be male, female or other'),
    body("image"),
    body("birth_date").notEmpty().escape().isDate(),
    (req, res) => {

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            userController.register(req, res);
        } else {
            res.status(404).json({ errors: errors.array() });
        }
  }
)

//update password
router.put("/updatePassword", utilities.verifyToken, param("email").isEmail(),
  body("password").isLength({min: 5}).withMessage("Password must have at least 5 characters.").notEmpty(),
  (req, res) => {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
          userController.updatePassword(req, res);
      } else {
          res.status(404).json({ errors: errors.array() });
      }
  }
);

router.put("/updateProfile", utilities.verifyToken, mutlerUploads, param("email").isEmail(),
  body("birth_date").isDate(),
  body("gender").isIn(['male', 'female', 'other']).withMessage('gender must be male, female or other'),
  body("username").isString(),
  body("image"),
  (req, res) => {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
          userController.updateProfile(req, res);
      } else {
          res.status(404).json({ errors: errors.array() });
      }
  }
);

router.route('/')
.get(userController.getAll)


router.all('*', (req, res) => {
    res.status(404).json({message: 'This route does not exist!'});
})

module.exports = router;