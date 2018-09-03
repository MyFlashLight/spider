import puppeteer from 'puppeteer-core';
(async () => {
	try {
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
		await page.goto('https://www.udemy.com/topic/react/?ratings=4.5&lang=en&sort=newest', pageOptions);
		let fullContent = await page.content();
		let checkElement = await page.$$('[data-purpose="search-course-cards"]');
		console.log('checkElement.length===========================');
		console.log(checkElement.length);
		let courseList = [];
		if (checkElement) {
			for (let i = 0; i < checkElement.length; i++) {
				let signleCourse = {};
				let item = checkElement[i];
				console.log('start login item ===========================');
				let getHrefText = await item.$('a');
				const courseHref = await page.evaluate((el) => el.href, getHrefText);
				signleCourse.courseHref = courseHref;
				console.log(signleCourse);
				// let getImageElement = await item.$('[class^="list-view-course-card--image-container"]');
				// console.log(getImageElement);
				//console.log(item);
			}
		}

		await browser.close();
		return fullContent;
	} catch (e) {
		console.log(e);
	}
})();


