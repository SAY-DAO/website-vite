/* eslint-disable import/no-unresolved */
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths'; // optional

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  // other config...
});
