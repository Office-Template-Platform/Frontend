// Card 404 sở hữu nội dung, minh họa và hành động; không quản lý shell hay đăng ký route.
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTE_PATHS } from '@/shared/config/route-paths';

// Hiển thị lỗi cùng một lối quay về tổng quan mà không giữ state hay gọi dữ liệu.
export function NotFoundCard() {
    return (
        <section
            className="not-found-card glass-panel"
            aria-labelledby="not-found-title"
        >
            <div className="not-found-art">
                <span className="not-found-digit">404</span>
            </div>
            <div className="not-found-copy">
                <h1 id="not-found-title">Không tìm thấy trang</h1>
                <p>
                    Kiểm tra lại đường dẫn hoặc quay về tổng quan để tiếp tục.
                </p>
            </div>
            <Button
                asChild
                variant="default"
                className="not-found-return-button"
            >
                <Link to={ROUTE_PATHS.home}>
                    <ArrowLeft size={16} strokeWidth={1.8} aria-hidden="true" />
                    Về tổng quan
                </Link>
            </Button>
        </section>
    );
}
