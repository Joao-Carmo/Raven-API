const express = require('express');
const router = express.Router();
const { validationResult, body, param } = require("express-validator");
const userController = require('../controllers/users.controller.js')
const authController = require('../controllers/auth.controller.js')


router.route('/')
    .post(
        body("username").notEmpty().escape().isString(),
        body("name").notEmpty().escape().isString(),
        body("email").isEmail().notEmpty().normalizeEmail(),
        body("password").notEmpty().isString().isLength({min: 5}),
        body("gender").isIn(),
        body("image"),
        body("birth_date").isDate().notEmpty(),
        (req, res) => {
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                userController.register(req, res);
            } else {
                res.status(404).json({ errors: errors.array() });
            }
        }
    )

router.all('*', (req, res) => {
    res.status(404).json({message: 'This route does not exist!'});
})

module.exports = router;