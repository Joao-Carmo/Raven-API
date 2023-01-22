const express = require('express');
const router = express.Router();
const { validationResult, body, param } = require("express-validator");
const preferencesController = require('../controllers/preferences.controller.js');

router.patch("/",
param("userID").isNumeric().notEmpty(),
param("categoryID").isNumeric().notEmpty(),
(req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        preferencesController.update(req, res);
    } else {
        res.status(404).json({ errors: errors.array() });
    }
})

router.get("/",  // Obter livros reservados
(req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        preferences.getAll(req, res);
    } else {
        res.status(404).json({ errors: errors.array() });
    }
  }
);

router.all('*', (req, res) => {
    res.status(404).json({message: 'This route does not exist!'});
})

module.exports = router;