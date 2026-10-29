// Layout hệ thống chỉ giữ điểm truy cập bàn phím và route con, không render chrome thư viện.
import { Outlet } from 'react-router-dom';

// Giữ route hệ thống độc lập với giao diện thư viện và cung cấp lối nhảy bàn phím dùng chung.
export function EmptyLayout() {
    return (
        <>
            <Outlet />
        </>
    );
}
