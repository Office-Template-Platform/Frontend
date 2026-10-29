// Trang chủ chỉ điều hướng đến hai sản phẩm; site shell quản lý header dùng chung.
import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '@/shared/config/route-paths';

// Render lối vào của hai thư viện mà không sở hữu dữ liệu hoặc state của chúng.
export function HomePage() {
    return (
        <main className="page-content" id="main-content">
            <section className="hero home-hero">
                <p className="eyebrow">BỘ CÔNG CỤ VĂN PHÒNG</p>
                <h1>Mẫu tốt giúp bắt đầu nhanh hơn.</h1>
                <p className="hero-copy">
                    Chọn thư viện phù hợp để tìm mẫu, xem trước và tạo tài liệu
                    mới.
                </p>
            </section>
            <section className="product-grid" aria-label="Hai sản phẩm">
                <Link
                    className="product-card document-card"
                    to={ROUTE_PATHS.documentTemplateCatalog}
                >
                    <span className="card-index">01 / VĂN BẢN</span>
                    <span className="card-icon" aria-hidden="true">
                        A
                    </span>
                    <h2>Thư viện mẫu văn bản</h2>
                    <p>
                        Tìm mẫu DOCX, xem trước bố cục và bắt đầu một tài liệu
                        mới.
                    </p>
                    <span className="card-link">
                        Mở thư viện <span aria-hidden="true">↗</span>
                    </span>
                </Link>
                <Link
                    className="product-card presentation-card"
                    to={ROUTE_PATHS.presentationTemplateCatalog}
                >
                    <span className="card-index">02 / TRÌNH CHIẾU</span>
                    <span className="card-icon" aria-hidden="true">
                        ▷
                    </span>
                    <h2>Thư viện mẫu trình chiếu</h2>
                    <p>
                        Khám phá bộ slide, xem trước từng mẫu và tạo bản trình
                        chiếu mới.
                    </p>
                    <span className="card-link">
                        Mở thư viện <span aria-hidden="true">↗</span>
                    </span>
                </Link>
            </section>
            <footer className="page-footer">
                <span>Hai sản phẩm, hai luồng làm việc chuyên biệt.</span>
                <span>Office Template Platform</span>
            </footer>
        </main>
    );
}
