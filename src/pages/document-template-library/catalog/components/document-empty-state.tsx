// Trạng thái catalog chưa có dữ liệu; giữ nội dung hướng dẫn và đường quay lại trong một vùng.
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTE_PATHS } from '@/shared/config/route-paths';
import { DocumentEmptyIllustration } from '@/pages/document-template-library/catalog/components/document-empty-illustration';

// Giải thích vì sao thư viện chưa có mẫu và đưa người dùng về trang tổng quan.
export function DocumentEmptyState() {
    return (
        <section className="empty-panel glass-panel" aria-live="polite">
            <DocumentEmptyIllustration />
            <div className="empty-copy">
                <span className="empty-status">Thư viện mẫu văn bản</span>
                <h2>Chưa có mẫu để hiển thị</h2>
                <p>
                    Các mẫu DOCX sẽ xuất hiện tại đây sau khi dữ liệu thư viện
                    được kết nối.
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
