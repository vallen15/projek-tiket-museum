const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./config/database'); // Import konfigurasi database

// Import routes
const userRoutes = require('./routes/userRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const museumInfoRoutes = require('./routes/museumInfoRoutes');
const adminLogRoutes = require('./routes/adminLogRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
app.get('/api/test-db', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS result');
        res.status(200).json({
            success: true,
            message: 'Database connected successfully!',
            result: rows[0].result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to connect to database.',
            error: error.message
        });
    }
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/museum-info', museumInfoRoutes);
app.use('/api/admin-logs', adminLogRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Something broke!'
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
