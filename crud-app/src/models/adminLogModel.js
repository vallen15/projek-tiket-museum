const pool = require('../config/database');

// Mendapatkan semua log aktivitas admin
exports.getAllLogs = async () => {
    try {
        const [rows] = await pool.execute('SELECT * FROM admin_logs');
        return rows;
    } catch (err) {
        throw new Error('Error fetching admin logs: ' + err.message);
    }
};

// Menambahkan log aktivitas admin baru
exports.createLog = async (admin_id, action, timestamp) => {
    try {
        const result = await pool.execute(
            'INSERT INTO admin_logs (admin_id, action, timestamp) VALUES (?, ?, ?)',
            [admin_id, action, timestamp]
        );
        return result;
    } catch (err) {
        throw new Error('Error creating admin log: ' + err.message);
    }
};
