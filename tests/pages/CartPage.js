const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');

class CartPage extends BasePage {

    constructor(page) {
        super(page);
        this.productLink = "//a[contains(text(),'Iphone 6 32gb')]";
        this.addToCartButton = "//a[contains(text(),'Add to cart')]";
        this.cartLink = '#cartur';
        this.cartTable = '#tbodyid';
        this.cartProductName = "//td[normalize-space()='Iphone 6 32gb']";
        this.deleteButton = '//a[text()="Delete"]';
        this.total=0;
    }

    async navigateToProduct() {
        await this.click(this.productLink);
        await this.page.waitForSelector(this.addToCartButton, { state: 'visible' });
    }

    async addToCart() {
        const [dialog] = await Promise.all([
            this.page.waitForEvent('dialog'),
            this.click(this.addToCartButton)
        ]);

        await dialog.accept();
        await this.page.waitForTimeout(1000);
    }

    async navigateToCart() {
        await this.click(this.cartLink);
        await this.page.locator(this.cartTable).waitFor({ state: 'visible' });
    }

    async verifyProductInCart() {
        await this.navigateToCart();
        const cartProduct = this.page.locator(`${this.cartTable} tr td:has-text('Iphone 6 32gb')`).first();
        await cartProduct.waitFor({ state: 'visible' });
        expect(await cartProduct.isVisible()).toBeTruthy();
    }

    async removeFromCart() {
        const itemCount = await this.page.locator(`${this.cartTable} tr`).count();
        this.total=itemCount;
        await this.navigateToCart();
        const deleteBtn = this.page.locator(`//tr[contains(., 'Iphone 6 32gb')]//a[text()='Delete']`).first();
        await deleteBtn.click();
        await this.page.waitForSelector(`//tr[contains(., 'Iphone 6 32gb')]`, { state: 'hidden' });

    }

    async verifyCartEmpty() {
        await this.navigateToCart();
        const itemCount = await this.page.locator(`${this.cartTable} tr`).count();
        expect(itemCount).toBe(this.total-1);
    }
}

module.exports = CartPage;