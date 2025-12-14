import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    //environment and global are required for component/integration test to work
    environment: 'jsdom',
    globals: true,
    setupFiles: './setupTests.js', // runs the code inside of this file before all of our test
  }
});