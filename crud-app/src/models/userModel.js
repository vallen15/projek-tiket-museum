const db = require('../config/database');

class User {
    // Mendapatkan semua users
    static async getAllUsers() {
        const [rows] = await db.query('SELECT * FROM users');
        return rows;
    }

    // Mendapatkan user berdasarkan email
    static async getUserByEmail(email) {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    // Membuat user baru
    static async createUser(email, password, role) {
        const query = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
        const [result] = await db.query(query, [email, password, role]);
        return result.insertId;
    }

    // Mengupdate data user berdasarkan email
    static async updateUser(email, newPassword, newRole) {
        const query = 'UPDATE users SET password = ?, role = ? WHERE email = ?';
        const [result] = await db.query(query, [newPassword, newRole, email]);
        return result.affectedRows;
    }

    // Menghapus user berdasarkan email
    static async deleteUser(email) {
        const [result] = await db.query('DELETE FROM users WHERE email = ?', [email]);
        return result.affectedRows;
    }

    // Mendapatkan jumlah total user
    static async getTotalUsers() {
        const [rows] = await db.query('SELECT COUNT(*) AS total FROM users');
        return rows[0].total;
    }
}

module.exports = User;
