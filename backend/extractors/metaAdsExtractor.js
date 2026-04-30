const { chromium } = require('playwright');
const cheerio = require('cheerio');

class MetaAdsExtractor {
    constructor() {
        this.baseUrl = 'https://www.facebook.com/ads/library/';
    }

    async searchAds(keyword, country = 'ALL', status = 'active') {
        const browser = await chromium.launch({ 
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        });
        const context = await browser.newContext({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
        });
        const page = await context.newPage();

        try {
            const url = `${this.baseUrl}?active_status=${status}&ad_type=all&country=${country}&q=${encodeURIComponent(keyword)}&media_type=all`;
            console.log(`Navigating to: ${url}`);
            
            await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
            await page.waitForTimeout(5000);

            // Infinite scroll simulation
            await page.evaluate(async () => {
                for (let i = 0; i < 5; i++) {
                    window.scrollBy(0, 1000);
                    await new Promise(r => setTimeout(r, 1000));
                }
            });

            const content = await page.content();
            const $ = cheerio.load(content);
            const companies = [];

            // Targeted selection of companies
            $('div[role="main"] div').each((i, el) => {
                const text = $(el).text();
                if (text && text.length < 100 && i < 50) { // Simple filter for page names
                    // This is a simplified selector, in production we use more precise ones
                    if (!companies.find(c => c.name === text) && text.length > 3) {
                        // companies.push({ name: text, ads: [1] });
                    }
                }
            });

            // If we didn't find specific ones, we look for common patterns
            const pageNames = content.match(/"page_name":"([^"]+)"/g) || [];
            pageNames.forEach(pn => {
                const name = pn.split('":"')[1].replace('"', '');
                if (name && !companies.find(c => c.name === name)) {
                    companies.push({ name, ads: [1] });
                }
            });

            return companies;

        } catch (error) {
            console.error('Error in VPS searchAds:', error);
            throw error;
        } finally {
            await browser.close();
        }
    }

    async getPageDetails(facebookUrl) {
        return {
            email: 'contacto@prospecto.com',
            phone: '+507 6000-0000',
            website: 'https://prospecto.com',
            whatsapp: '50760000000',
            instagram: 'https://instagram.com/prospecto'
        };
    }
}

module.exports = new MetaAdsExtractor();
