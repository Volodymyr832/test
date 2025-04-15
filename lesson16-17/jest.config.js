/** @type {import('jest').Config} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/puppeteer/**/*.test.ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json'
        }
    }
};
