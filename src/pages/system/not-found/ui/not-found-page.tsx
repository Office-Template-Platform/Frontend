// Trang hệ thống dự phòng cho URL không được nhận diện trong route registry.
import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '@/shared/config/route-paths';

// Hiển thị lỗi route và đường quay lại; site layout đã cung cấp nhận diện chung.
export function NotFoundPage() {
    return (
        <main className="page-content" id="main-content">
            <section className="empty-state not-found-state">
                <p className="eyebrow">404 · KHÔNG TÌM THẤY TRANG</p>
                <h1>Trang này chưa có trong thư viện.</h1>
                <Link className="card-link" to={ROUTE_PATHS.home}>
                    Quay về trang chính <span aria-hidden="true">↗</span>
                </Link>
            </section>
        </main>
    );
}
