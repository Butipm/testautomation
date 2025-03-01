module.exports = {
  default: {
    formatOptions: { snippetInterface: "async-await" },
    paths: ["src/tests/features/**/*.feature"],
    requireModule: ["ts-node/register"],
    require: [
      "src/tests/steps/*.ts",
      "src/hooks/*.ts"
    ],
    timeout: 600000,
    format: [
      "progress",
      "json:playwright-report/cucumber.json", // Cucumber JSON report
      "@cucumber/junit-xml-formatter" // JUnit formatter
    ],
    formatOptions: {
      // Specify output for JUnit report
      output: "playwright-report/test-results.xml" // Path to save JUnit report
    }
  },
  publishQuiet: true,
  dryRun: false // Set to false to actually run tests
};
