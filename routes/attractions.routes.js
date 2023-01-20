const express = require('express');
const router = express.Router();
const { validationResult, body, param } = require("express-validator");
const attractionsController = require('../controllers/attractions.controller.js')


router.post("/",
(req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    attractionsController.create(req, res);
  } else {
    res.status(404).json({ errors: errors.array() });
  }
})

router.get("/",  // Obter livros reservados
(req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      attractionsController.getAll(req, res);
    } else {
      res.status(404).json({ errors: errors.array() });
    }
  }
);



router.all('*', (req, res) => {
    res.status(404).json({message: 'This route does not exist!'});
})

module.exports = router;