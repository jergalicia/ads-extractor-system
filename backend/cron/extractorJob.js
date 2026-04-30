const cron = require('node-cron');
const metaAdsExtractor = require('../extractors/metaAdsExtractor');
const db = require('../database/db');

// Schedule extraction every 6 hours (as requested)
// 0 */6 * * *
cron.schedule('0 */6 * * *', async () => {
    console.log('Running scheduled extraction...');
    
    // Example: Search for a set of keywords automatically
    const keywords = ['clinica estetica', 'odontologia', 'bienes raices'];
    const countries = ['PA', 'CO', 'MX'];

    for (const keyword of keywords) {
        for (const country of countries) {
            try {
                console.log(`Cron: Extracting ${keyword} in ${country}`);
                // Implementation would call the search logic here
                // For brevity, we could refactor the controller logic into a service
            } catch (err) {
                console.error(`Cron error for ${keyword}/${country}:`, err);
            }
        }
    }
});

console.log('Cron jobs initialized');
