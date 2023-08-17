import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                clientsClaim: true,
                skipWaiting: true
            }
        })
    ],
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:9999",
                rewrite: (path) => path.replace(/^\/api/, ""),
            }
        }
    },
    build: {
        outDir: "/Users/wurengui/Code/code-self/vit-base-patch16-224-in21k_human_activity_recognition/dist",
    }
})
