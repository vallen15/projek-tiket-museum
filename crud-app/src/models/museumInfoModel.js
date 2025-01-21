const pool = require('../config/database');

// Mendapatkan informasi museum
exports.getMuseumInfo = async () => {
    try {
        const [rows] = await pool.execute('SELECT * FROM museum_info LIMIT 1');
        return rows[0];
    } catch (err) {
        throw new Error('Error fetching museum info: ' + err.message);
    }
};

// Mengupdate informasi museum
exports.updateMuseumInfo = async (openingHours, ticketPrice, eventInfo) => {
    try {
        const result = await pool.execute(
            'UPDATE museum_info SET opening_hours = ?, ticket_price = ?, event_info = ? WHERE id = 1',
            [openingHours, ticketPrice, eventInfo]
        );
        return result;
    } catch (err) {
        throw new Error('Error updating museum info: ' + err.message);
    }
};
