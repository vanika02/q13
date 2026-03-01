const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    let totalSum = 0;
    const seeds = [22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

    for (const seed of seeds) {
        console.log(`Scraping seed: ${seed}`);
        await page.goto(`https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`);

        // Wait for table to load
        await page.waitForSelector('table');

        // Extract all numbers from the table
        const numbers = await page.evaluate(() => {
            const cells = Array.from(document.querySelectorAll('td'));
            return cells.map(cell => parseInt(cell.textContent, 10)).filter(n => !isNaN(n));
        });

        const seedSum = numbers.reduce((a, b) => a + b, 0);
        totalSum += seedSum;
        console.log(`Sum for seed ${seed}: ${seedSum}`);
    }

    console.log(`FINAL_ANSWER: ${totalSum}`);
    await browser.close();
})();
