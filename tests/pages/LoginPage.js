const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.loginLink = '#login2';
        this.username = '#loginusername';
        this.password = '#loginpassword';
        this.loginBtn = '//button[@onclick="logIn()"]';
        this.dashboardUserName = '#nameofuser';
        this.loginModal = '#logInModal';
        this.pageTitle = 'h1';
        
    }

    async navigate() {
        await this.page.goto('https://www.demoblaze.com/#');
        await this.page.locator('body').waitFor({ state: 'visible' });
        await this.click(this.loginLink);
        await this.page.locator(this.loginModal).waitFor({ state: 'visible' });
    }

    async enterCredentials(username, password) {
        await this.fill(this.username, username);
        await this.fill(this.password, password);
    }

    async login() {
        const defaultUsername = 'PIA_user05';
        const defaultPassword = '12345@we';
        await this.enterCredentials(defaultUsername, defaultPassword);
    }

    async clickLogin() {
        await this.click(this.loginBtn);
    }


    async validateMessage() {
        await this.page.waitForTimeout(4000);

        await this.page.waitForSelector(this.dashboardUserName, { state: 'visible' });
        const userNameText = await this.page.locator(this.dashboardUserName).textContent();
        expect(userNameText).toContain('Welcome');
    }

    async validateErrorMessage() {
        // Try to capture a dialog that appears as a result of login
        let dialog = null;
        try {
            dialog = await this.page.waitForEvent('dialog', { timeout: 3000 });
        } catch (e) {
            dialog = null;
        }

        if (dialog) {
            const message = dialog.message();
            expect(message).toContain('Wrong password.');
            await dialog.accept();
            return;
        }

        // Fallback: check that dashboard did not appear
        const dashboardVisible = await this.page.locator(this.dashboardUserName).isVisible().catch(() => false);
        if (dashboardVisible) {
            throw new Error('Dashboard appeared; expected an error instead of successful login');
        }

        // If no dialog and no dashboard, assume an in-page error; try to find common alert text
        const bodyText = await this.page.locator('body').innerText();
        expect(bodyText).toContain('Wrong password.');
    }

}

module.exports = LoginPage;