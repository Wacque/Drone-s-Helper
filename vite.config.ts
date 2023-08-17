import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true
            },
            workbox: {
                clientsClaim: true,
                skipWaiting: true
            },
            includeAssets: ['u16.svg', 'apple-touch-icon-180x180.png', 'maskable-icon-512x512.png'],
            manifest: {
                name: 'GoodWorkingDays',
                theme_color: '#000000',
                icons: [
                    {
                        src: 'pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            }
        })
    ],
    server: {
        proxy: {
            "/api": {
                target: "https://acque.cn/",
                rewrite: (path) => path.replace(/^\/api/, ""),
            }
        }
    },
    build: {
        // outDir: "/Users/wurengui/Code/code-self/vit-base-patch16-224-in21k_human_activity_recognition/dist",
    }
})
