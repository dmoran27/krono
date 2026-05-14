import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'prompt', 
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', '/*.png'], 
      manifest: {
        name: 'Kronos',
        short_name: 'Kronos',
        description: 'Cronómetro profesional para entrenamientos de alta intensidad con asistencia por voz.',
        theme_color: '#3366cc', 
        background_color: '#121212', 
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: '/web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable' 
          }
        ],
        screenshots: [
          {
            src: "/screenshots/desktop.png",
            sizes: "1280x638",
            type: "image/png",
            form_factor: "wide",
            label: "Vista de entrenamiento en escritorio"
          },
          {
            src: "/screenshots/mobile.png",
            sizes: '387x840',
            type: "image/png",
            form_factor: "narrow",
            label: "Vista de entrenamiento en móvil"
          }
        ]
      }
    })
  ],
  server: {
    host: '0.0.0.0', 
    port: 5173,
    strictPort: true, 
    watch: {
      usePolling: true, 
      interval: 1000,   
    },
    hmr: {
      clientPort: 5173, 
    }
  }
})