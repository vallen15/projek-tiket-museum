const Payment = require('../models/paymentModel');

// Membuat pembayaran
exports.createPayment = async (req, res) => {
    const { ticket_id, amount_paid, payment_method } = req.body;

    // Validasi input
    if (!ticket_id || !amount_paid || !payment_method) {
        return res.status(400).json({ message: 'Semua data harus diisi.' });
    }

    try {
        const paymentId = await Payment.createPayment(ticket_id, amount_paid, payment_method);
        res.status(201).json({
            message: 'Pembayaran berhasil dibuat.',
            payment_id: paymentId,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
