// Cấu hình Vite cho SPA React và alias nguồn @/ dùng ở toàn frontend.
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

// Dùng đường dẫn tuyệt đối để import alias hoạt động nhất quán trên Windows và CI.
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        port: 3000,
    },
});
