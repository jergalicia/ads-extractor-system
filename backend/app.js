const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet({
    contentSecurityPolicy: false, // For development and API access
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Serve static files in production
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch-all route to serve the frontend index.html for SPA routing
app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) return; // Don't catch API routes
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
