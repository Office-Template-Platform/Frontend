// Điều hướng trang theo metadata totalPages backend trả về.
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { DocumentCatalogPaginationProps } from '@/pages/document-template-library/catalog/types/document-template-ui.types';

// Chặn nút biên và thông báo vị trí hiện tại trong tập kết quả đang lọc.
export function DocumentCatalogPagination({
    page,
    totalPages,
    total,
    onPageChange,
}: DocumentCatalogPaginationProps) {
    return (
        <nav
            className="flex flex-col items-center justify-between gap-3 rounded-[20px] border border-white/75 bg-white/35 px-4 py-3 sm:flex-row"
            aria-label="Phân trang thư viện mẫu"
        >
            <p className="text-xs text-(--muted-ink)" aria-live="polite">
                Trang <span className="font-semibold text-(--ink)">{page}</span>{' '}
                / {totalPages} <span className="px-1 text-blue-300">·</span>{' '}
                {total} mẫu
            </p>
            <div className="flex items-center gap-2">
                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => onPageChange(page - 1)}
                    disabled={page <= 1}
                    aria-label="Trang trước"
                    className="h-9 rounded-[12px] border-white/90 bg-white/65 px-3"
                >
                    <ChevronLeft aria-hidden="true" />
                    Trước
                </Button>
                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => onPageChange(page + 1)}
                    disabled={page >= totalPages}
                    aria-label="Trang tiếp theo"
                    className="h-9 rounded-[12px] border-white/90 bg-white/65 px-3"
                >
                    Tiếp
                    <ChevronRight aria-hidden="true" />
                </Button>
            </div>
        </nav>
    );
}
