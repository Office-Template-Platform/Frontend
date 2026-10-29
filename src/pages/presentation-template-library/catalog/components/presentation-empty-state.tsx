// Trạng thái catalog chưa có dữ liệu; giữ nội dung hướng dẫn và đường quay lại trong một vùng.
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTE_PATHS } from '@/shared/config/route-paths';
import { PresentationEmptyIllustration } from '@/pages/presentation-template-library/catalog/components/presentation-empty-illustration';

// Giải thích vì sao thư viện chưa có mẫu và đưa người dùng về trang tổng quan.
export function PresentationEmptyState() {
    return (
        <section className="empty-panel glass-panel" aria-live="polite">
            <PresentationEmptyIllustration />
            <div className="empty-copy">
                <span className="empty-status">Thư viện trình chiếu</span>
                <h2>Chưa có bộ mẫu để hiển thị</h2>
                <p>
                    Các bộ PPTX và ảnh xem trước slide sẽ xuất hiện tại đây sau
                    khi dữ liệu được kết nối.
                </p>
                <Button
                    asChild
                    variant="outline"
                    className="empty-return-button"
                >
                    <Link to={ROUTE_PATHS.home}>
                        <ArrowLeft
                            size={16}
                            strokeWidth={1.8}
                            aria-hidden="true"
                        />
                        Về tổng quan
                    </Link>
                </Button>
            </div>
        </section>
    );
}
