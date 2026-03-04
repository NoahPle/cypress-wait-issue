import { defineConfig } from 'cypress'

export default defineConfig({
  viewportHeight: 720,
  viewportWidth: 1280,
  e2e: {
    specPattern: './cypress/e2e/**/*.cy.{ts,tsx}',
  }
})
