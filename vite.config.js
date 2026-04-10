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
                target: 'http://89.109.16.50:7002',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})