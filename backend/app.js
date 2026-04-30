const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const path = require('path');

console.log('--- SISTEMA INICIANDO (VERSIÓN 1.2) ---');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Global error handlers for diagnosis
process.on('uncaughtException', (err) => {
    console.error('CRITICAL ERROR (Uncaught Exception):', err.message);
    console.error(err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('CRITICAL ERROR (Unhandled Rejection):', reason);
});

// Middleware
app.use(helmet({
    contentSecurityPolicy: false, // For development and API access
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Diagnostic route to find paths
app.get('/api/debug-path', (req, res) => {
    const fs = require('fs');
    try {
        const paths = [
            path.join(__dirname, '../'),
            path.join(__dirname, '../../'),
            path.join(__dirname, '../../../'),
            path.join(__dirname, '../../../../')
        ];
        const results = {};
        paths.forEach(p => {
            try { results[p] = fs.readdirSync(p); } catch(e) { results[p] = "Error: " + e.message; }
        });
        res.json({ 
            currentDir: __dirname, 
            scanned: results
        });
    } catch (e) {
        res.json({ error: e.message, currentDir: __dirname });
    }
});

// Database Connection (Pool)
const db = require('./database/db');

// Cron Jobs
require('./cron/extractorJob');

// Routes
const companyRoutes = require('./routes/companies');
const adRoutes = require('./routes/ads');
const exportRoutes = require('./routes/export');
const searchRoutes = require('./routes/search');

app.use('/api/companies', companyRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/search', searchRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

// Serve static files in production - Using absolute path for Hostinger
const publicPath = '/home/u294757052/public_html/dist';

app.use(express.static(publicPath));

// Catch-all route to serve the frontend index.html for SPA routing
app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) return; // Don't catch API routes
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`>>> SERVER IS ALIVE ON PORT ${PORT} <<<`);
});
