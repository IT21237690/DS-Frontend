import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://http://localhost:9080/api:9080",
        changeOrigin: true,
        secure: false,
      },
    },
  }
})
