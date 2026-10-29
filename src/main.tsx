// Điểm khởi chạy React; styles và route registry được tách thành các module độc lập.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProviders } from '@/providers/app-providers';
import { AppRouter } from '@/routes/router';
import '@/styles/globals.css';

// Kiểm tra mount point trước khi khởi tạo để lỗi HTML shell được báo rõ ràng.
function mountReactApplication() {
    const rootElement = document.getElementById('root');

    if (!rootElement) {
        throw new Error('Không tìm thấy vùng khởi tạo ứng dụng React.');
    }

    createRoot(rootElement).render(
        <StrictMode>
            <AppProviders>
                <AppRouter />
            </AppProviders>
        </StrictMode>,
    );
}

mountReactApplication();
