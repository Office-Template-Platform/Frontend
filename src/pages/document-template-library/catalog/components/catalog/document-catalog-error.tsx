// Trạng thái lỗi cung cấp nguyên nhân thân thiện và thao tác tải lại dữ liệu catalog.
import { CircleAlert, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getApiErrorMessage } from '@/shared/api/get-api-error-message';
import type { DocumentCatalogErrorProps } from '@/pages/document-template-library/catalog/types/document-template-ui.types';

// Giữ bộ lọc trên màn hình để người dùng có thể thử lại mà không mất ngữ cảnh.
export function DocumentCatalogError({
    error,
    onRetry,
}: DocumentCatalogErrorProps) {
    return (
        <section className="glass-panel flex flex-col items-center rounded-[25px] px-6 py-12 text-center sm:py-16">
            <span className="mb-4 flex size-14 items-center justify-center rounded-[19px] border border-white/90 bg-blue-50/80 text-blue-600 shadow-sm">
                <CircleAlert className="size-6" aria-hidden="true" />
            </span>
            <h2 className="text-lg font-semibold tracking-[-0.02em] text-(--ink)">
                Chưa tải được thư viện mẫu
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-(--muted-ink)">
                {getApiErrorMessage(
                    error,
                    'Không thể tải dữ liệu từ máy chủ. Vui lòng thử lại.',
                )}
            </p>
            <Button
                type="button"
                onClick={onRetry}
                className="mt-5 h-10 rounded-[13px] bg-blue-600 px-4 text-white hover:bg-blue-700"
            >
                <RefreshCw className="size-4" aria-hidden="true" />
                Thử tải lại
            </Button>
        </section>
    );
}
