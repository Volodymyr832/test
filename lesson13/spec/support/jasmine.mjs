export default {
  spec_dir: "test/jasmine",
  spec_files: ["**/*.spec.ts"], 
  helpers: ["../../node_modules/ts-node/register/index.js"],
  env: {
      stopSpecOnExpectationFailure: false,
      random: false,
      forbidDuplicateNames: true
  }
};
