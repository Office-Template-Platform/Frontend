// Trang danh mục mẫu trình chiếu; phần header và khung trang thuộc site layout.
import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '@/shared/config/route-paths';

// Giữ nội dung trình chiếu trong page slice riêng, không ghép với nghiệp vụ văn bản.
export function PresentationLibraryPage() {
    return (
        <main className="page-content" id="main-content">
            <section className="library-heading">
                <Link className="back-link" to={ROUTE_PATHS.home}>
                    ← Tất cả sản phẩm
                </Link>
                <p className="eyebrow">SẢN PHẨM 02 · TRÌNH CHIẾU</p>
                <h1>Thư viện mẫu trình chiếu</h1>
                <p className="hero-copy">
                    Khám phá bộ slide, xem trước cấu trúc và tạo bản trình chiếu
                    độc lập với mẫu gốc.
                </p>
            </section>
            <section
                className="empty-state presentation-empty"
                aria-live="polite"
            >
                <span className="empty-icon" aria-hidden="true">
                    PPT
                </span>
                <p className="eyebrow">KHỞI TẠO THƯ VIỆN</p>
                <h2>Danh sách bộ trình chiếu sẽ hiển thị tại đây</h2>
                <p>
                    Giao diện và API đã được tách riêng cho sản phẩm này. Bước
                    tiếp theo là nối dữ liệu mẫu PPTX và ảnh xem trước từng
                    slide.
                </p>
            </section>
            <footer className="page-footer">
                <span>Thư viện mẫu trình chiếu</span>
                <span>API: GET /api/presentation-templates</span>
            </footer>
        </main>
    );
}
