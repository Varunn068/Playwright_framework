const { Given, When, Then } = require("@cucumber/cucumber");
const RegistrationPage = require("../pages/RegistrationPage");

Given("I am on the DemoBlaze home page", async function () {
  this.registrationPage = new RegistrationPage(this.page);
  await this.registrationPage.open();
});

When("I click on {string} link", async function (linkText) {
  await this.registrationPage.clickSignUpLink();
});

When("I enter registration username", async function () {
  await this.registrationPage.enterUsername();
});

When("I enter registration password", async function () {
  await this.registrationPage.enterPassword();
});

When("I click the {string} button", async function (buttonText) {
  // Start listening for alert BEFORE clicking
  const alertPromise = this.registrationPage.getAlertMessage();
  await this.registrationPage.clickSignUpButton();
  // Wait for alert and store message
  this.alertMessage = await alertPromise;
});

Then("I should see an alert with message {string}", async function (expectedMessage) {
  console.log("Alert message received:", this.alertMessage);
  if (!this.alertMessage.includes(expectedMessage)) {
    throw new Error(
      `Expected alert: "${expectedMessage}" but got: "${this.alertMessage}"`
    );
  }
});