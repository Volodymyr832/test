module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/jest/**/*.spec.ts'],
  clearMocks: true,
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transform: {
      '^.+\\.ts$': 'ts-jest'
  },
  verbose: true
};
