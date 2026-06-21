const {expect} = require('@playwright/test');
const BasePage = require('./BasePage');
const config = require("../conf/qa");
const saveOrderDetails = require('../utils/saveOrderDetails');

class CheckoutPage extends BasePage {
    constructor(page) {
        super(page);
        this.cartLink = '#cartur';
        this.placeOrderButton = "//button[contains(text(),'Place Order')]";
        this.checkoutButton = '#checkout2';
        this.nameInput = '#name';
        this.countryInput = '#country';
        this.cityInput = '#city';
        this.creditCardInput = '#card';
        this.monthInput = '#month';
        this.yearInput = '#year';
        this.purchaseButton = "//button[contains(text(),'Purchase')]";
        this.confirmationMessage = "//p[@class='lead text-muted ']";
        this.okbutton="//button[contains(text(),'OK')]";

    }

    async placeOrder() {
        await this.click(this.cartLink);
        await this.page.waitForTimeout(2000);
        await this.click(this.placeOrderButton);
    }

    
async fillCheckoutForm(name = config.customer_name, country = config.customer_country, city = config.customer_city, creditCard = config.customer_credit_card, month = config.customer_month, year = config.customer_year) {
        await this.fill(this.nameInput, name);
        await this.fill(this.countryInput, country);
        await this.fill(this.cityInput, city);
        await this.fill(this.creditCardInput, creditCard);
        await this.fill(this.monthInput, month);
        await this.fill(this.yearInput, year);
        await this.click(this.purchaseButton);
    }
    async verifyOrderConfirmation() {
    await this.page.waitForSelector(this.confirmationMessage, { state: 'visible' });
    const message = await this.page.locator(this.confirmationMessage).textContent();
    console.log('Order details (raw):', message);

    const order = saveOrderDetails(message);
    console.log('Order details (JSON):', JSON.stringify(order, null, 2));

    await this.click(this.okbutton);
}
}

module.exports = CheckoutPage;