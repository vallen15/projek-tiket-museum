const db = require('../config/database');  // Pastikan koneksi ke database sudah benar

class Ticket {
    // Mendapatkan semua tiket
    static async getAllTickets() {
        try {
            const [rows] = await db.query('SELECT * FROM tickets');
            return rows;  // Mengembalikan semua tiket
        } catch (error) {
            throw new Error('Gagal mengambil tiket: ' + error.message);  // Menangani error secara lebih jelas
        }
    }

    // Membuat tiket baru
    static async createTicket(user_id, ticket_date, status, price) {
        const query = 'INSERT INTO tickets (user_id, ticket_date, status, price) VALUES (?, ?, ?, ?)';
        const values = [user_id, ticket_date, status, price];

        try {
            const [result] = await db.query(query, values);  // Menyimpan tiket ke database
            return result.insertId;  // Mengembalikan ID tiket yang baru dibuat
        } catch (error) {
            throw new Error('Gagal membuat tiket: ' + error.message);  // Menangani error jika gagal memasukkan data
        }
    }

    // Mengonfirmasi tiket
    static async confirmTicket(ticketId, status) {
        const query = 'UPDATE tickets SET status = ? WHERE id = ?';
        const values = [status, ticketId];

        try {
            const [result] = await db.query(query, values);
            if (result.affectedRows === 0) {
                throw new Error('Tiket tidak ditemukan atau gagal diperbarui');
            }
            return result;  // Mengembalikan hasil update
        } catch (error) {
            throw new Error('Gagal mengonfirmasi tiket: ' + error.message);  // Menangani error
        }
    }
}

module.exports = Ticket;
