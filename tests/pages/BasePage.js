
class BasePage {
  constructor(page) {
    this.page = page;                    // Playwright page object
  }

  // ── 1. NAVIGATION ──────────────────────────────────────
  async navigate(path = "") {
   await this.page.goto('https://www.demoblaze.com/#');
    await this.page.waitForLoadState("domcontentloaded");
  }
  // Usage in LoginPage:  await this.navigate("/login")

  async getTitle() {
    return await this.page.title();
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  // ── 2. ELEMENT ACTIONS ─────────────────────────────────
  async click(selector) {
    await this.page.locator(selector).waitFor({ state: "visible" });
    await this.page.locator(selector).click();
  }
  // Waits for element before clicking — avoids flaky tests

  async fill(selector, value) {
    await this.page.locator(selector).waitFor({ state: "visible" });
    await this.page.locator(selector).clear();
    await this.page.locator(selector).fill(value);
  }
  // Clears existing text first, then types

  async getText(selector) {
    await this.page.locator(selector).waitFor({ state: "visible" });
    return await this.page.locator(selector).textContent();
  }

  async selectOption(selector, value) {
    await this.page.locator(selector).selectOption(value);
  }
  // For <select> dropdowns

  // ── 3. ELEMENT STATE ───────────────────────────────────
  async isVisible(selector) {
    return await this.page.locator(selector).isVisible();
  }

  async isEnabled(selector) {
    return await this.page.locator(selector).isEnabled();
  }

  async getCount(selector) {
    return await this.page.locator(selector).count();
  }
  // How many matching elements exist

  async getAllTexts(selector) {
    return await this.page.locator(selector).allTextContents();
  }
  // Returns array of text from all matching elements

  // ── 4. WAITS ───────────────────────────────────────────
  async waitForElement(selector, state = "visible") {
    await this.page.locator(selector).waitFor({ state });
  }

  async waitForUrl(urlPattern) {
    await this.page.waitForURL(urlPattern);
  }

  // ── 5. ASSERTIONS ──────────────────────────────────────
  async expectVisible(selector) {
    await this.page.locator(selector).waitFor({ state: "visible" });
    const visible = await this.page.locator(selector).isVisible();
    if (!visible) throw new Error(`Element not visible: ${selector}`);
  }

  async expectText(selector, expectedText) {
    const actual = await this.getText(selector);
    if (!actual.includes(expectedText)) {
      throw new Error(`Expected "${expectedText}" but got "${actual}"`);
    }
  }

  async expectUrl(expectedUrl) {
    const current = await this.getCurrentUrl();
    if (!current.includes(expectedUrl)) {
      throw new Error(`Expected URL "${expectedUrl}" but got "${current}"`);
    }
  }
}

module.exports = BasePage;