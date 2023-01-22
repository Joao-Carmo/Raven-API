const express = require('express');
const router = express.Router();
const { validationResult, body, param } = require("express-validator");
const badgesController = require('../controllers/badges.controller.js');
const multer = require('multer');

let storage = multer.diskStorage({});

const mutlerUploads = multer({storage: storage, limits: {fileSize: 500000}}).single('image');

router.get("/",
(req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      badgesController.getAll(req, res);
    } else {
      res.status(404).json({ errors: errors.array() });
    }
  }
);

router.post("/", mutlerUploads,
  body("name").notEmpty().escape().isString(),
  body("image").notEmpty(),
  body("text").notEmpty().escape().isString(),
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