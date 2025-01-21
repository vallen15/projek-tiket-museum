const User = require('../models/userModel');

// Mendapatkan semua users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mendapatkan user berdasarkan email
exports.getUserByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.getUserByEmail(email);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User tidak ditemukan.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Membuat user baru
exports.createUser = async (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return res.status(400).json({ message: 'Semua data wajib diisi.' });
    }
    try {
        const userId = await User.createUser(email, password, role);
        res.status(201).json({
            message: 'User berhasil dibuat!',
            userId,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mengupdate data user berdasarkan email
exports.updateUser = async (req, res) => {
    const { email } = req.params;
    const { password, role } = req.body;
    if (!password || !role) {
        return res.status(400).json({ message: 'Password dan role wajib diisi.' });
    }
    try {
        const affectedRows = await User.updateUser(email, password, role);
        if (affectedRows > 0) {
            res.json({ message: 'User berhasil diperbarui!' });
        } else {
            res.status(404).json({ message: 'User tidak ditemukan.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Menghapus user berdasarkan email
exports.deleteUser = async (req, res) => {
    const { email } = req.params;
    try {
        const affectedRows = await User.deleteUser(email);
        if (affectedRows > 0) {
            res.json({ message: 'User berhasil dihapus!' });
        } else {
            res.status(404).json({ message: 'User tidak ditemukan.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mendapatkan jumlah total user
exports.getTotalUsers = async (req, res) => {
    try {
        const total = await User.getTotalUsers();
        res.json({ total });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
