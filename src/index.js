// import puppeteer from 'puppeteer-core';
(async () => {
	try {
		const puppeteer = require('puppeteer-core');
		const browser = await puppeteer.launch({
			args: [ '--no-sandbox', '--disable-setuid-sandbox' ],
			// executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
			executablePath: 'chromium/chrome-win32/chrome',
			headless: false,
			isMobile: true
		});
		let page = await browser.newPage();
		await page.setViewport({ width: 700, height: 800 });
		let pageOptions = {
			timeout: 300000,
			waitUntil: 'networkidle0'
		};
		await page.goto('https://www.baidu.com/', pageOptions);
		let fullContent = await page.content();

		await browser.close();
		return fullContent;
	} catch (e) {
		console.log(e);
	}
})();


