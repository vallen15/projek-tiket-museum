const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Membuat pembayaran
router.post('/', paymentController.createPayment);

module.exports = router;
