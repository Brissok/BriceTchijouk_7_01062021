const express = require('express');
const router = express.Router();

const animalCtrl = require('../controllers/animal');

router.get('/', animalCtrl.getAllAnimal);

module.exports = router;