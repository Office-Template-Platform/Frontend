// Điểm vào route 404; giữ vùng ngữ nghĩa của trang ở đây, phần card thuộc component feature.
import { NotFoundCard } from '@/pages/system/not-found/components/not-found-card';

// Cung cấp vùng nội dung độc lập để trang 404 không kế thừa shell thư viện.
export function NotFoundPage() {
    return (
        <main className="not-found-page" id="main-content">
            <NotFoundCard />
        </main>
    );
}
