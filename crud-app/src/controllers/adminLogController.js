const adminLogModel = require('../models/adminLogModel');

// Mendapatkan semua log aktivitas admin
exports.getAllLogs = async (req, res) => {
    try {
        const logs = await adminLogModel.getAllLogs();
        res.status(200).json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Menambahkan log aktivitas admin baru
exports.createLog = async (req, res) => {
    const { admin_id, action, timestamp } = req.body;

    try {
        const result = await adminLogModel.createLog(admin_id, action, timestamp);
        res.status(201).json({ message: 'Log created successfully', id: result[0].insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
