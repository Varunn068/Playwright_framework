const { Given, When, Then } = require('@cucumber/cucumber');
const CartPage = require('../pages/CartPage');
const LoginPage = require('../pages/LoginPage');

Given('User is viewing a product', async function () {
    this.cartPage = new CartPage(this.page);
    await this.cartPage.navigateToProduct();
});

When('User clicks Add To Cart', async function () {
    await this.cartPage.addToCart();
});

Then('Product should be added to cart', async function () {
    await this.cartPage.verifyProductInCart();
});

Given('Product exists in cart', async function () {
    this.cartPage = new CartPage(this.page);
    await this.cartPage.navigateToProduct();
    await this.cartPage.addToCart();
});

When('User removes the product', async function () {
    await this.cartPage.removeFromCart();
});

Then('Cart should be empty', async function () {
    await this.cartPage.verifyCartEmpty();
});
