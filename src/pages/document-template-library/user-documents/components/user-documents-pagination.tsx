// Điều hướng trang tài liệu theo metadata do GET /user-documents trả về.
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { UserDocumentsPaginationProps } from '@/pages/document-template-library/user-documents/types/user-documents-page.types';

// Khóa nút ở hai đầu và thông báo rõ trang hiện tại trong kết quả tìm kiếm.
export function UserDocumentsPagination({
    page,
    totalPages,
    total,
    onPageChange,
}: UserDocumentsPaginationProps) {
    return (
        <nav
            className="mt-5 flex flex-col items-center justify-between gap-3 rounded-[19px] border border-white/75 bg-white/35 px-4 py-3 sm:flex-row"
            aria-label="Phân trang tài liệu"
        >
            <p className="text-xs text-(--muted-ink)" aria-live="polite">
                Trang <span className="font-semibold text-(--ink)">{page}</span>{' '}
                trên {totalPages}, {total} tài liệu
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
