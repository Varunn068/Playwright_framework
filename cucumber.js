module.exports = {
  default: {
    require: ['tests/step-definitions/**/*.js','tests/support/**/*.js'],
    format: ['progress-bar',
      'json:reports/multi-json-html/cucumber_report.json'],
  }
};
  