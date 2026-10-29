import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '@/shared/config/route-paths';

// Giữ nội dung văn bản trong trang catalog để các route khác cùng domain có thể phát triển riêng.
export function DocumentLibraryPage() {
    return (
        <main className="page-content" id="main-content">
            <section className="library-heading">
                <Link className="back-link" to={ROUTE_PATHS.home}>
                    ← Tất cả sản phẩm
                </Link>
                <p className="eyebrow">SẢN PHẨM 01 · VĂN BẢN</p>
                <h1>Thư viện mẫu văn bản</h1>
                <p className="hero-copy">
                    Chọn mẫu phù hợp để tạo tài liệu mới mà không làm thay đổi
                    bản gốc.
                </p>
            </section>
            <section className="empty-state" aria-live="polite">
                <span className="empty-icon" aria-hidden="true">
                    DOC
                </span>
                <p className="eyebrow">KHỞI TẠO THƯ VIỆN</p>
                <h2>Danh sách mẫu văn bản sẽ hiển thị tại đây</h2>
                <p>
                    Giao diện và API đã được tách riêng cho sản phẩm này. Bước
                    tiếp theo là nối dữ liệu mẫu DOCX, tìm kiếm và xem trước.
                </p>
            </section>
            <footer className="page-footer">
                <span>Thư viện mẫu văn bản</span>
                <span>API: GET /api/document-templates</span>
            </footer>
        </main>
    );
}
