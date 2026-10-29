// Điều hướng và nhận diện thương hiệu dùng chung; không sở hữu state nghiệp vụ.
import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '@/shared/config/route-paths';

// Đưa người dùng về trang chọn sản phẩm và hiển thị logo từ asset tĩnh trong public.
export function ProductNavigation() {
    return (
        <header className="site-header">
            <Link
                className="brand"
                to={ROUTE_PATHS.home}
                aria-label="Office Template Platform — về trang chính"
            >
                <img
                    className="brand-logo"
                    src="/images/office-template-logo.png"
                    alt=""
                />
                <span>Office Template Platform</span>
            </Link>
            <span className="header-caption">Không gian mẫu tài liệu</span>
        </header>
    );
}
