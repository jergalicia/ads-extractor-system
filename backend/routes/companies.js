const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

router.get('/', companyController.getAll);
router.get('/:id', companyController.getById);
router.get('/:id/ads', companyController.getAds);

module.exports = router;
