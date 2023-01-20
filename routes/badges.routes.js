const express = require('express');
const router = express.Router();
const { validationResult, body, param } = require("express-validator");
const badgesController = require('../controllers/badges.controller.js');

router.get("/",  // Obter livros reservados
(req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      badgesController.getAll(req, res);
    } else {
      res.status(404).json({ errors: errors.array() });
    }
  }
);

router.post("", 
(req,res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        badgesController.create(req,res);
    } else {
        res.status(404).json({errors: errors.array()})
    }
})

router.all('*', (req, res) => {
    res.status(404).json({message: 'This route does not exist!'});
})

module.exports = router;