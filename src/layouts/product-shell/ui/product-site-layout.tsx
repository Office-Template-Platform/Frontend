// Khung trang cấp sản phẩm sở hữu điều hướng chung, không giữ state nghiệp vụ.
import { Outlet } from 'react-router-dom';
import { ProductNavigation } from '@/layouts/product-shell/ui/product-navigation';

// Dùng chung header và giới hạn bề rộng cho mọi route thuộc website.
export function ProductSiteLayout() {
    return (
        <div className="site-shell">
            <a className="skip-link" href="#main-content">
                Bỏ qua đến nội dung chính
            </a>
            <ProductNavigation />
            <Outlet />
        </div>
    );
}
