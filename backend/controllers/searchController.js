const metaAdsExtractor = require('../extractors/metaAdsExtractor');
const db = require('../database/db');

exports.search = async (req, res) => {
    const { keyword, country, status } = req.query;

    if (!keyword) {
        return res.status(400).json({ error: 'Keyword is required' });
    }

    try {
        console.log(`Starting search for: ${keyword} in ${country}`);
        
        // 1. Log extraction start
        const [logResult] = await db.execute(
            'INSERT INTO extraction_logs (keyword_search, country, status) VALUES (?, ?, ?)',
            [keyword, country || 'ALL', 'processing']
        );
        const logId = logResult.insertId;

        // 2. Perform extraction
        const results = await metaAdsExtractor.searchAds(keyword, country || 'ALL', status || 'active');

        // 3. Process results (Mock processing for now)
        // In a real scenario, we would iterate over results and save to companies table
        // and visit each page for more details.
        
        let totalCompanies = 0;
        let totalAds = 0;

        for (const companyData of results) {
            // Check if company exists
            const [existing] = await db.execute('SELECT id FROM companies WHERE company_name = ?', [companyData.name]);
            
            let companyId;
            if (existing.length > 0) {
                companyId = existing[0].id;
                await db.execute(
                    'UPDATE companies SET last_ad_date = NOW(), ads_count = ads_count + ? WHERE id = ?',
                    [companyData.ads.length, companyId]
                );
            } else {
                // Get more details (mocked in extractor)
                const details = await metaAdsExtractor.getPageDetails(companyData.facebookUrl);
                
                const [insertResult] = await db.execute(
                    `INSERT INTO companies 
                    (company_name, keyword_search, country, facebook_url, website_url, email, phone, whatsapp, ads_status, ads_count, opportunity_score) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        companyData.name || 'Sin Nombre', 
                        keyword || '', 
                        country || 'ALL', 
                        companyData.facebookUrl || '', 
                        details.website || null, 
                        details.email || null, 
                        details.phone || null, 
                        details.whatsapp || null, 
                        status || 'active',
                        (companyData.ads && companyData.ads.length) || 0,
                        Math.floor(Math.random() * 100)
                    ]
                );
                companyId = insertResult.insertId;
                totalCompanies++;
            }

            // Save ads
            if (companyData.ads && Array.isArray(companyData.ads)) {
                for (const ad of companyData.ads) {
                    await db.execute(
                        'INSERT INTO ads (company_id, ad_type, ad_text, ad_image, ad_video, platform, ad_status, ad_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                        [
                            companyId, 
                            ad.type || 'text', 
                            ad.text || '', 
                            ad.image || null, 
                            ad.video || null, 
                            ad.platform || 'facebook', 
                            ad.status || 'active', 
                            ad.date || new Date()
                        ]
                    );
                    totalAds++;
                }
            }
        }

        // 4. Update log
        await db.execute(
            'UPDATE extraction_logs SET total_companies = ?, total_ads = ?, status = ? WHERE id = ?',
            [totalCompanies, totalAds, 'completed', logId]
        );

        res.json({
            message: 'Search completed successfully',
            companiesFound: results.length,
            data: results
        });

    } catch (error) {
        console.error('SEARCH CONTROLLER ERROR:', error);
        res.status(500).json({ 
            error: 'Error durante la extracción', 
            details: error.message,
            tip: 'Asegúrate de que las tablas de la base de datos existan.'
        });
    }
};
