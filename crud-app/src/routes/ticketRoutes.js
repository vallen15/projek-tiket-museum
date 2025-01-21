const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Mengambil semua tiket
router.get('/', async (req, res) => {
  try {
    const tickets = await ticketController.getAllTickets();
    res.status(200).json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Membuat tiket baru
router.post('/', async (req, res) => {
  const { name, email, tickets, visitDate, paymentMethod } = req.body;

  // Validasi data
  if (!name || !email || !tickets || !visitDate || !paymentMethod) {
    return res.status(400).json({ message: 'Data tidak lengkap' });
  }

  try {
    const newTicket = await ticketController.createTicket({ name, email, tickets, visitDate, paymentMethod });
    res.status(201).json({ success: true, message: 'Tiket berhasil dibuat', ticket: newTicket });
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ message: 'Gagal membuat tiket' });
  }
});

// Mengonfirmasi tiket
router.put('/confirm/:id', async (req, res) => {
  const ticketId = req.params.id;

  try {
    const updatedTicket = await ticketController.confirmTicket(ticketId);
    if (updatedTicket) {
      res.status(200).json({ success: true, message: 'Tiket berhasil dikonfirmasi' });
    } else {
      res.status(404).json({ message: 'Tiket tidak ditemukan' });
    }
  } catch (error) {
    console.error('Error confirming ticket:', error);
    res.status(500).json({ message: 'Gagal mengonfirmasi tiket' });
  }
});

module.exports = router;
