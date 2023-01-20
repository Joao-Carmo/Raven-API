const express = require('express');
// const router = express.Router();
const authController = require('../controllers/auth.controller.js');
// const { validationResult, body, param } = require("express-validator");
let router = express.Router({mergeParams: true})

router.route('/')
.post(authController.login)


router.all('*', (req, res) => {
    res.status(404).json({message: 'NOT FOUND'});
})

module.exports = router;