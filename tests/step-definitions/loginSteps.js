const { Given, When, Then } = require('@cucumber/cucumber');
const LoginPage = require('../pages/LoginPage');

let loginPage;

Given('User is on login page', async function () {
    loginPage = new LoginPage(this.page);
    await loginPage.navigate();
});

When('User logs in with valid credentials', async function () {
    await loginPage.login();
    await loginPage.clickLogin();
    await this.page.waitForTimeout(3000);
});

When('User enters valid username and password', async function () {
    await loginPage.login();
});


When('User clicks Login button', async function () {
    await loginPage.clickLogin();
});

When('User enters {string} and {string}', async function (username, password) {
    await loginPage.enterCredentials(username, password);
});


Then('Login result should be displayed', async function () {
    await loginPage.validateMessage();
});

Then('It should display an error message', async function () {
    await loginPage.validateErrorMessage();
})

Then('Error message should be displayed', async function () {
    await loginPage.validateErrorMessage();
})
