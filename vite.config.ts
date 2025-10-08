import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = '/';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  base: repoName,
})
