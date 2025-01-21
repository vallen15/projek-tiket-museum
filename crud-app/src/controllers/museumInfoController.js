const museumInfoModel = require('../models/museumInfoModel');

// Mendapatkan informasi museum
exports.getMuseumInfo = async (req, res) => {
    try {
        const museumInfo = await museumInfoModel.getMuseumInfo();
        res.status(200).json(museumInfo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Mengupdate informasi museum
exports.updateMuseumInfo = async (req, res) => {
    const { openingHours, ticketPrice, eventInfo } = req.body;

    try {
        await museumInfoModel.updateMuseumInfo(openingHours, ticketPrice, eventInfo);
        res.status(200).json({ message: 'Museum information updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
