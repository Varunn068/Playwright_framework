const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

BeforeAll(async function () {
    console.log('Starting Test Execution');

    global.browser = await chromium.launch({
        headless: false
    });
});

Before(async function () {
    global.context = await global.browser.newContext();
    global.page = await global.context.newPage();
    this.page = global.page;

    console.log('New Scenario Started');
});

After(async function () {
    await global.context.close();

    console.log('Scenario Completed');
});

AfterAll(async function () {
    await global.browser.close();

    console.log('Browser Closed');
});
