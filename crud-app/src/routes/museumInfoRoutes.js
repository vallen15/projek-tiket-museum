const express = require('express');
const router = express.Router();
const museumInfoController = require('../controllers/museumInfoController');

// Mendapatkan informasi museum
router.get('/', museumInfoController.getMuseumInfo);

// Menyimpan informasi museum yang diperbarui
router.put('/', museumInfoController.updateMuseumInfo);

module.exports = router;
