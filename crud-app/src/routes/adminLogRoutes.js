const express = require('express');
const router = express.Router();
const adminLogController = require('../controllers/adminLogController');

// Mendapatkan semua log aktivitas admin
router.get('/', adminLogController.getAllLogs);

// Menambahkan log aktivitas admin baru
router.post('/', adminLogController.createLog);

module.exports = router;
