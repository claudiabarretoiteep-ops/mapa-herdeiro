import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 8080,
        host: true, // Expose to network
        open: true, // Open browser automatically
    },
    build: {
        outDir: 'dist',
        sourcemap: true,
    }
})
