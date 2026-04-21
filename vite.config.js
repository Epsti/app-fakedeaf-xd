import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    build: {
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html'),
                profile: path.resolve(__dirname, 'profile.html'),
                favorites: path.resolve(__dirname, 'favorites.html'),
                movieframe: path.resolve(__dirname, 'movieframe.html'),
                test: path.resolve(__dirname, 'test.html'),
            }
        }
    },
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