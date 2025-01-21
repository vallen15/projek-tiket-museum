const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Middleware untuk memeriksa admin
const isAdmin = (req, res, next) => {
    const { role } = req.body; // Pastikan role dikirim di request body
    if (role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Akses ditolak. Hanya untuk admin.' });
    }
};

// Mendapatkan semua users (hanya untuk admin)
router.get('/admin/users', isAdmin, userController.getAllUsers);

// Mendapatkan user berdasarkan email
router.get('/:email', userController.getUserByEmail);

// Membuat user baru
router.post('/', userController.createUser);

// Mengupdate data user berdasarkan email
router.put('/:email', userController.updateUser);

// Menghapus user berdasarkan email
router.delete('/:email', userController.deleteUser);

// Mendapatkan jumlah total users
router.get('/admin/total-users', isAdmin, userController.getTotalUsers);

module.exports = router;
