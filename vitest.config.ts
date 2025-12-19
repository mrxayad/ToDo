import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',          // Simulates browser environment
    globals: true,                 // Allows using `describe`, `it`, `expect` without imports
    setupFiles: './src/setupTests.ts', // Setup file for jest-dom
  },
});