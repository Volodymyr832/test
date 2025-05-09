import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
        supportFile: false,
        viewportWidth: 1200,
        viewportHeight: 800,
        defaultCommandTimeout: 10000
    }
});
