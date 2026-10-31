// Các trạng thái tải, rỗng và lỗi riêng cho trang thùng rác.
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
    ArrowLeft,
    RefreshCw,
    Search,
    TriangleAlert,
    Trash2,
} from 'lucide-react';
import { getApiErrorMessage } from '@/shared/api/get-api-error-message';
import { ROUTE_PATHS } from '@/shared/config/route-paths';

// Giữ chiều cao trang ổn định trong khi chờ metadata các tài liệu đã xóa.
export function TrashDocumentsSkeleton() {
    return (
        <section
            className="overflow-hidden rounded-[24px] border border-white/85 bg-white/38 px-4 shadow-[inset_0_1px_0_rgb(255_255_255/92%)] sm:px-5"
            role="status"
            aria-label="Đang tải thùng rác"
            aria-busy="true"
        >
            <div className="flex min-h-14 items-center justify-between border-b border-blue-100/65">
                <Skeleton className="h-5 w-36 bg-slate-200/85" />
                <Skeleton className="h-4 w-12 bg-slate-100" />
            </div>
            {Array.from({ length: 4 }, (_, index) => (
                <div
                    key={index}
                    className="flex flex-col gap-3.5 border-b border-blue-100/65 py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between"
                >
                    <div className="flex min-w-0 items-center gap-3.5">
                        <Skeleton className="size-11 shrink-0 rounded-[15px] bg-blue-100/75" />
                        <div className="grid min-w-0 flex-1 gap-2">
                            <Skeleton className="h-5 w-2/3 bg-slate-200/85" />
                            <Skeleton className="h-4 w-4/5 bg-slate-100" />
                            <Skeleton className="h-3.5 w-1/2 bg-slate-100" />
                        </div>
                    </div>
                    <Skeleton className="ml-[54px] h-9 w-28 rounded-[12px] bg-blue-100/80 sm:ml-0" />
                </div>
            ))}
        </section>
    );
}

// Phân biệt thùng rác trống với tìm kiếm không có kết quả và đưa ra bước tiếp theo phù hợp.
export function TrashDocumentsEmptyState({
    hasSearch,
    onClearSearch,
}: {
    hasSearch: boolean;
    onClearSearch: () => void;
}) {
    return (
        <section className="glass-panel flex flex-col items-center rounded-[26px] px-6 py-12 text-center sm:py-16">
            <span className="mb-4 grid size-14 place-items-center rounded-[19px] border border-white/90 bg-blue-50/90 text-blue-700 shadow-sm">
                {hasSearch ? (
                    <Search className="size-6" aria-hidden="true" />
                ) : (
                    <Trash2 className="size-6" aria-hidden="true" />
                )}
            </span>
            <h2 className="text-lg font-semibold tracking-[-0.02em] text-(--ink)">
                {hasSearch
                    ? 'Không tìm thấy tài liệu phù hợp'
                    : 'Thùng rác đang trống'}
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-(--muted-ink)">
                {hasSearch
                    ? 'Thử từ khóa khác để tìm tài liệu đã xóa.'
                    : 'Khi bạn xóa tài liệu, tài liệu sẽ xuất hiện tại đây và có thể được khôi phục.'}
            </p>
            {hasSearch ? (
                <Button
                    type="button"
                    variant="outline"
                    className="mt-5 h-10 rounded-[13px] border-blue-100 bg-white/80 px-4 text-blue-800 hover:bg-white"
                    onClick={onClearSearch}
                >
                    Xóa tìm kiếm
                </Button>
            ) : (
                <Button
                    asChild
                    variant="outline"
                    className="mt-5 h-10 rounded-[13px] border-blue-100 bg-white/80 px-4 text-blue-800 hover:bg-blue-50"
                >
                    <Link to={ROUTE_PATHS.userDocuments}>
                        <ArrowLeft aria-hidden="true" />
                        Về tài liệu của tôi
                    </Link>
                </Button>
            )}
        </section>
    );
}

// Hiển thị lỗi truy vấn và thao tác tải lại ngay tại vùng thùng rác.
export function TrashDocumentsErrorState({
    error,
    onRetry,
}: {
    error: unknown;
    onRetry: () => void;
}) {
    return (
        <section
            className="glass-panel flex flex-col items-center rounded-[26px] px-6 py-12 text-center sm:py-16"
            role="alert"
        >
            <span className="mb-4 grid size-14 place-items-center rounded-[19px] border border-amber-100 bg-amber-50 text-amber-700 shadow-sm">
                <TriangleAlert className="size-6" aria-hidden="true" />
            </span>
            <h2 className="text-lg font-semibold tracking-[-0.02em] text-(--ink)">
                Chưa tải được thùng rác
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-(--muted-ink)">
                {getApiErrorMessage(
                    error,
                    'Không thể kết nối với máy chủ. Hãy thử tải lại danh sách.',
                )}
            </p>
            <Button
                type="button"
                onClick={onRetry}
                className="mt-5 h-10 rounded-[13px] bg-blue-600 px-4 text-white hover:bg-blue-700"
            >
                <RefreshCw aria-hidden="true" />
                Thử tải lại
            </Button>
        </section>
    );
}
