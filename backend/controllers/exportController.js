const db = require('../database/db');
const XLSX = require('xlsx');

exports.toExcel = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM companies');
        
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(rows);
        XLSX.utils.book_append_sheet(wb, ws, "Companies");
        
        const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
        
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=companies.xlsx');
        res.send(buffer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.toCSV = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM companies');
        
        const ws = XLSX.utils.json_to_sheet(rows);
        const csv = XLSX.utils.sheet_to_csv(ws);
        
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=companies.csv');
        res.send(csv);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
