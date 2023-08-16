import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "https://7a50-103-43-85-174.ngrok-free.app/",
                rewrite: (path) => path.replace(/^\/api/, ""),
            }
        }
    }
})
