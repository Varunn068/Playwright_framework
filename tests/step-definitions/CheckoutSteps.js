const { Given, When, Then } = require('@cucumber/cucumber');
const CheckoutPage = require('../pages/CheckoutPage');
const LoginPage = require('../pages/LoginPage');


Given('User has products in cart', async function () {
    this.checkoutPage = new CheckoutPage(this.page);
    await this.checkoutPage.placeOrder();
});

When('User completes payment', async function () {
   await this.checkoutPage.fillCheckoutForm();
});

Then('Order should be placed successfully', async function () {
   await this.checkoutPage.verifyOrderConfirmation();
});