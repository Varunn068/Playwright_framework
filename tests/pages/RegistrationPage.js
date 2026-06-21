const BasePage = require("./BasePage");
const config = require("../conf/qa");
class RegistrationPage extends BasePage {
  constructor(page) {
    super(page);

    // Locators
    this.signUpNavLink    = "#signin2";
    this.signUpModal      = "#signInModal";
    this.usernameInput    = "#sign-username";
    this.passwordInput    = "#sign-password";
    this.signUpButton     = "button[onclick='register()']";
  }

  async open() {
    await this.navigate("https://www.demoblaze.com/");
  }

  async clickSignUpLink() {
    await this.click(this.signUpNavLink);
    // wait for modal to appear
    await this.waitForElement(this.usernameInput);
  }

  async enterUsername( user_name = config.user_name ) {
    console.log("Config:", config);
    await this.fill(this.usernameInput, user_name);
  }

  async enterPassword(password = config.pass_word) {
    await this.fill(this.passwordInput, password);
  }

  async clickSignUpButton() {
    await this.click(this.signUpButton);
  }

  // DemoBlaze shows result as browser alert — this handles it
  async getAlertMessage() {
    return new Promise((resolve) => {
      this.page.once("dialog", async (dialog) => {
        const message = dialog.message();
        await dialog.accept();
        resolve(message);
        if (message.includes("Sign up successful")) {
          console.log("Sign up successful");
        } else if (message.includes("This user already exist.")) {
          console.log("User already exists");
        } else {
          console.log("Unexpected alert message:", message);
        }
      });
    });
  }
}

module.exports = RegistrationPage;