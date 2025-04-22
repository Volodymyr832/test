/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const XrayClient = require('../xray.config');

async function createTestExecution(summary, description) {
  try {
    const testExecutionKey = await XrayClient.createTestExecution({
      summary: summary,
      description: description,
    });
    console.log('Test execution created with key:', testExecutionKey);
    return testExecutionKey;
  } catch (error) {
    console.error('Error creating test execution:', error);
    throw error;
  }
}

// Import Test Results to Xray

async function importExecutionResults(testExecutionKey) {
  try {
    await XrayClient.importExecutionResults(testExecutionKey);
    console.log('Test results imported successfully to Xray');
  } catch (error) {
    console.error('Error importing results to Xray:', error);
    throw error;
  }
}

module.exports = {
  createTestExecution,
  importExecutionResults,
};
