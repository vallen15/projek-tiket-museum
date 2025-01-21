const db = require('../config/database');  // Pastikan koneksi ke database sudah benar

class Payment {
    // Membuat pembayaran baru
    static async createPayment(ticket_id, amount_paid, payment_method) {
        const query = 'INSERT INTO payments (ticket_id, amount_paid, payment_method) VALUES (?, ?, ?)';
        const values = [ticket_id, amount_paid, payment_method];
        const [result] = await db.query(query, values);
        return result.insertId;  // Mengembalikan ID pembayaran yang baru dibuat
    }
}

module.exports = Payment;
