module.exports = {
  default: {
    require: ['step-definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress', 'html:reports/cucumber-report.html'],
    paths: ['features/**/*.feature'],
    parallel: 0
  }
}
