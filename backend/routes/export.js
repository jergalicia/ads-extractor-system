const express = require('express');
const router = express.Router();
const exportController = require('../controllers/exportController');

router.get('/excel', exportController.toExcel);
router.get('/csv', exportController.toCSV);

module.exports = router;
