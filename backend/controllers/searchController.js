const metaAdsExtractor = require('../extractors/metaAdsExtractor');
const db = require('../database/db');

exports.search = async (req, res) => {
    const { keyword, country, status } = req.query;

    if (!keyword) {
        return res.status(400).json({ error: 'Keyword is required' });
    }

    try {
        console.log(`Starting search for: ${keyword} in ${country}`);
        
        // 1. Perform extraction
        const results = await metaAdsExtractor.searchAds(keyword, country || 'ALL', status || 'active');

        // 2. Process first 5 results for deep extraction
        const topResults = results.slice(0, 5);

        for (const companyData of topResults) {
            // Fetch real contact details
            if (companyData.pageId) {
                try {
                    const details = await metaAdsExtractor.getPageDetails(companyData.pageId);
                    Object.assign(companyData, details);
                } catch (err) {
                    console.error(`Error fetching details for ${companyData.name}:`, err.message);
                }
            }

            // Simple async save (don't block the response)
            db.execute(
                `INSERT INTO companies 
                (company_name, keyword_search, country, facebook_url, website_url, email, phone, whatsapp, instagram_url, ads_status, ads_count, opportunity_score) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) 
                ON DUPLICATE KEY UPDATE last_ad_date = NOW()`,
                [
                    companyData.name || 'Sin Nombre', 
                    keyword || '', 
                    country || 'ALL', 
                    companyData.facebookUrl || '', 
                    companyData.website || null, 
                    companyData.email || null, 
                    companyData.phone || null, 
                    companyData.phone || null, 
                    companyData.instagram || null,
                    status || 'active',
                    (companyData.ads && companyData.ads.length) || 1,
                    Math.floor(Math.random() * 30) + 70
                ]
            ).catch(err => console.error("Database save error:", err.message));
        }

        res.json({
            message: 'Search completed successfully',
            companiesFound: topResults.length,
            data: topResults
        });

    } catch (error) {
        console.error('SEARCH CONTROLLER ERROR:', error);
        res.status(500).json({ 
            error: 'Error durante la extracción', 
            details: error.message
        });
    }
};
