// Trạng thái catalog chưa có dữ liệu; giữ nội dung hướng dẫn và đường quay lại trong một vùng.
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTE_PATHS } from '@/shared/config/route-paths';
import { DocumentEmptyIllustration } from './document-empty-illustration';
import type { DocumentEmptyStateProps } from '@/pages/document-template-library/catalog/types/document-template-ui.types';

// Phân biệt catalog chưa có dữ liệu với bộ lọc không tìm thấy kết quả.
export function DocumentEmptyState({
    hasFilters,
    onClearFilters,
}: DocumentEmptyStateProps) {
    return (
        <section className="empty-panel glass-panel" aria-live="polite">
            <DocumentEmptyIllustration />
            <div className="empty-copy">
                <span className="empty-status">Thư viện mẫu văn bản</span>
                <h2>
                    {hasFilters
                        ? 'Không tìm thấy mẫu phù hợp'
                        : 'Thư viện chưa có mẫu'}
                </h2>
                <p>
                    {hasFilters
                        ? 'Thử từ khóa khác hoặc xóa bộ lọc danh mục để xem thêm mẫu DOCX.'
                        : 'Hiện chưa có mẫu DOCX nào được xuất bản trong thư viện.'}
                </p>
                {hasFilters ? (
                    <Button
                        type="button"
                        variant="outline"
                        className="empty-return-button"
                        onClick={onClearFilters}
                    >
                        Xóa bộ lọc
                    </Button>
                ) : (
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
                )}
            </div>
        </section>
    );
}
