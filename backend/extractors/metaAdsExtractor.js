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
            const pageDataRegex = /"page_name":"([^"]+)","page_id":"(\d+)"/g;
            let match;
            while ((match = pageDataRegex.exec(content)) !== null) {
                const name = match[1];
                const pageId = match[2];
                if (name && !companies.find(c => c.name === name)) {
                    companies.push({ name, pageId, ads: [1] });
                }
            }

            return companies;

        } catch (error) {
            console.error('Error in VPS searchAds:', error);
            throw error;
        } finally {
            await browser.close();
        }
    }

    async getPageDetails(pageId) {
        const browser = await chromium.launch({ headless: true });
        const context = await browser.newContext({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
        });
        const page = await context.newPage();

        try {
            // Visit mobile version for better scraping
            const url = `https://m.facebook.com/profile.php?id=${pageId}&sk=about`;
            console.log(`Extracting details from: ${url}`);
            
            await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
            // Wait a bit for the data to be injected by React
            await page.waitForTimeout(3000); 
            
            const content = await page.content();
            
            // Refined Regex for phone and email
            const details = {
                email: (content.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/) || [])[0] || null,
                phone: (content.match(/\+?[0-9][0-9\s-]{7,14}[0-9]/) || [])[0] || null,
                website: (content.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b/) || [])[0] || null,
                instagram: (content.match(/instagram\.com\/[a-zA-Z0-9._]+/) || [])[0] || null,
                facebookUrl: `https://facebook.com/${pageId}`
            };

            return details;
        } catch (error) {
            console.error(`Error getting details for ${pageId}:`, error.message);
            return {};
        } finally {
            await browser.close();
        }
    }
}

module.exports = new MetaAdsExtractor();
