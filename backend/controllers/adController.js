const db = require('../database/db');

exports.getById = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM ads WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Ad not found' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
