import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{ts,tsx}',
    baseUrl: 'http://localhost:4173'
  }
})
