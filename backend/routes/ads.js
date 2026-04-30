const express = require('express');
const router = express.Router();
const adController = require('../controllers/adController');

router.get('/:id', adController.getById);

module.exports = router;
