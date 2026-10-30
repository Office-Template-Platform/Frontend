// Gom các trạng thái tải, rỗng và lỗi để page giữ trách nhiệm điều phối dữ liệu.
import {
    FilePlus,
    FolderOpen,
    RefreshCw,
    Search,
    TriangleAlert,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getApiErrorMessage } from '@/shared/api/get-api-error-message';
import { ROUTE_PATHS } from '@/shared/config/route-paths';
import type {
    UserDocumentsEmptyStateProps,
    UserDocumentsErrorStateProps,
} from '@/pages/document-template-library/user-documents/types/user-documents-page.types';

// Giữ bố cục mục vừa cập nhật và các dòng kết quả trong lúc danh sách đầu tiên tải.
export function UserDocumentsSkeleton() {
    return (
        <div
            className="space-y-5"
            role="status"
            aria-label="Đang tải tài liệu"
            aria-busy="true"
        >
            <div className="flex flex-col gap-4 rounded-[26px] border border-white/90 bg-white/60 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <div className="flex min-w-0 items-center gap-4">
                    <Skeleton className="size-14 shrink-0 rounded-[18px] bg-blue-100/80" />
                    <div className="grid min-w-0 flex-1 gap-2.5">
                        <Skeleton className="h-4 w-24 rounded-full bg-blue-100/80" />
                        <Skeleton className="h-6 w-2/3 bg-slate-200/85" />
                        <Skeleton className="h-4 w-1/2 bg-slate-100" />
                    </div>
                </div>
                <div className="flex gap-2 border-t border-blue-100/70 pt-3.5 sm:border-0 sm:pt-0">
                    <Skeleton className="h-10 flex-1 rounded-[13px] bg-blue-200/80 sm:w-40 sm:flex-none" />
                    <Skeleton className="h-10 flex-1 rounded-[13px] bg-white sm:w-28 sm:flex-none" />
                </div>
            </div>
            <div className="overflow-hidden rounded-[24px] border border-white/85 bg-white/38 px-4 sm:px-5">
                <div className="flex min-h-14 items-center justify-between border-b border-blue-100/65">
                    <Skeleton className="h-5 w-36 bg-slate-200/85" />
                    <Skeleton className="h-4 w-12 bg-slate-100" />
                </div>
                {Array.from({ length: 4 }, (_, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-3 border-b border-blue-100/65 py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between"
                    >
                        <div className="flex min-w-0 items-center gap-3.5">
                            <Skeleton className="size-10 shrink-0 rounded-[14px] bg-blue-100/75" />
                            <div className="grid min-w-0 flex-1 gap-2">
                                <Skeleton className="h-5 w-2/3 bg-slate-200/85" />
                                <Skeleton className="h-4 w-4/5 bg-slate-100" />
                            </div>
                        </div>
                        <div className="flex gap-2 pl-[54px] sm:pl-0">
                            <Skeleton className="h-7 w-24 rounded-full bg-emerald-100/80" />
                            <Skeleton className="h-9 w-20 rounded-[12px] bg-blue-100/80" />
                            <Skeleton className="h-9 w-24 rounded-[12px] bg-white" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Hướng dẫn bắt đầu tạo file hoặc điều chỉnh tìm kiếm khi workspace chưa có kết quả.
export function UserDocumentsEmptyState({
    hasSearch,
    onClearSearch,
}: UserDocumentsEmptyStateProps) {
    return (
        <section className="glass-panel flex flex-col items-center rounded-[26px] px-6 py-12 text-center sm:py-16">
            <span className="mb-4 grid size-14 place-items-center rounded-[19px] border border-white/90 bg-blue-50/90 text-blue-700 shadow-sm">
                {hasSearch ? (
                    <Search className="size-6" aria-hidden="true" />
                ) : (
                    <FolderOpen className="size-6" aria-hidden="true" />
                )}
            </span>
            <h2 className="text-lg font-semibold tracking-[-0.02em] text-(--ink)">
                {hasSearch
                    ? 'Không tìm thấy tài liệu phù hợp'
                    : 'Bạn chưa có tài liệu nào'}
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-(--muted-ink)">
                {hasSearch
                    ? 'Thử từ khóa khác để tìm trong các tài liệu đã tạo.'
                    : 'Tạo một bản DOCX từ mẫu, sau đó tài liệu sẽ xuất hiện tại đây để bạn mở lại.'}
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
                    className="mt-5 h-10 rounded-[13px] bg-blue-600 px-4 text-white shadow-[0_8px_20px_rgb(33_118_229/18%)] hover:bg-blue-700"
                >
                    <Link to={ROUTE_PATHS.documentTemplateCatalog}>
                        <FilePlus aria-hidden="true" />
                        Tạo tài liệu từ mẫu
                    </Link>
                </Button>
            )}
        </section>
    );
}

// Nêu rõ lỗi truy vấn và giữ thao tác tải lại ngay tại vùng danh sách.
export function UserDocumentsErrorState({
    error,
    onRetry,
}: UserDocumentsErrorStateProps) {
    return (
        <section
            className="glass-panel flex flex-col items-center rounded-[26px] px-6 py-12 text-center sm:py-16"
            role="alert"
        >
            <span className="mb-4 grid size-14 place-items-center rounded-[19px] border border-amber-100 bg-amber-50 text-amber-700 shadow-sm">
                <TriangleAlert className="size-6" aria-hidden="true" />
            </span>
            <h2 className="text-lg font-semibold tracking-[-0.02em] text-(--ink)">
                Chưa tải được tài liệu
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
