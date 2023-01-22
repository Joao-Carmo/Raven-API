const express = require('express');
const authController = require('../controllers/auth.controller.js');
const { validationResult, body, param } = require("express-validator");
let router = express.Router({mergeParams: true})


router.route("/")
.post(
    body("email").notEmpty().escape(),
    body("password").notEmpty().escape(),
        (req, res) => {
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                authController.login(req, res);
            } else {

                res.status(404).json({ errors: errors.array() });
            }
        }
)

router.all('*', (req, res) => {
    res.status(404).json({message: 'NOT FOUND'});
})

module.exports = router;