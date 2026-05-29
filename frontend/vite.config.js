import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': "".concat(__dirname, "/src"),
            '@app': "".concat(__dirname, "/src/app"),
            '@features': "".concat(__dirname, "/src/features"),
            '@shared': "".concat(__dirname, "/src/shared"),
            '@store': "".concat(__dirname, "/src/store"),
            '@admin': "".concat(__dirname, "/../admin"),
        },
    },
    server: {
        fs: {
            allow: ['..'],
        },
        proxy: {
            '/api': {
                target: 'https://backkend-testseries.onrender.com',
                changeOrigin: true,
            },
        },
    },
});
