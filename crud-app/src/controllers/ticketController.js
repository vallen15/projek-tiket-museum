exports.createTicket = async (req, res) => {
    const { user_id, ticket_date, status, price } = req.body;
 
    // Validasi input
    if (!user_id || !ticket_date || !status || !price) {
        return res.status(400).json({ message: 'Semua data harus diisi.' });
    }
 
    try {
        const ticketId = await Ticket.createTicket(user_id, ticket_date, status, price);
        res.status(201).json({
            message: 'Tiket berhasil dibuat.',
            ticket_id: ticketId,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 };
 