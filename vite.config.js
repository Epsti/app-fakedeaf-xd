import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    // Твои существующие алиасы
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    // Добавляем блок сервера с прокси
    server: {
        proxy: {
            '/api': {
                target: 'https://app.epsti.site/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})