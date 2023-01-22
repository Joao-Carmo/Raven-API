const express = require('express');
const router = express.Router();
const { validationResult, body, param } = require("express-validator");
const categoryController = require('../controllers/categories.controller.js')

router.get("/",
(req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      categoryController.getAll(req, res);
    } else {
      res.status(404).json({ errors: errors.array() });
    }
  }
);


router.all('*', (req, res) => {
    res.status(404).json({message: 'This route does not exist!'});
})

module.exports = router;