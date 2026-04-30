const db = require('../database/db');

exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM companies ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM companies WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Company not found' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAds = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM ads WHERE company_id = ?', [req.params.id]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
