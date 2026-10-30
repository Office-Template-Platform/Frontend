// Page đọc catalog PPTX từ backend và trình bày trạng thái loading, lỗi hoặc dữ liệu thật.
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PresentationCatalogHeading } from '@/pages/presentation-template-library/catalog/components/presentation-catalog-heading';
import { PresentationEmptyState } from '@/pages/presentation-template-library/catalog/components/presentation-empty-state';
import { PresentationTemplateCard } from '@/pages/presentation-template-library/catalog/components/presentation-template-card';
import { useListPresentationTemplatesQuery } from '@/services/presentation-template';
import { getApiErrorMessage } from '@/shared/api/get-api-error-message';

// Chỉ hiển thị metadata server trả về; API hiện chưa có thao tác tạo PPTX.
export function PresentationLibraryPage() {
    const { data, error, isError, isFetching, isLoading, refetch } =
        useListPresentationTemplatesQuery();
    const templates = data ?? [];

    return (
        <main
            className="catalog-page flex min-w-0 flex-1 flex-col"
            id="main-content"
        >
            <PresentationCatalogHeading />
            {isLoading ? (
                <div
                    className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3"
                    aria-label="Đang tải bộ mẫu trình chiếu"
                    aria-busy="true"
                >
                    {Array.from({ length: 3 }, (_, index) => (
                        <div
                            key={index}
                            className="glass-panel rounded-[25px] p-3.5 sm:p-4"
                        >
                            <Skeleton className="aspect-video rounded-[19px] bg-sky-100/70" />
                            <Skeleton className="mt-4 h-5 w-2/3" />
                            <Skeleton className="mt-3 h-10 w-full" />
                        </div>
                    ))}
                </div>
            ) : isError && !data ? (
                <section className="glass-panel flex flex-col items-center rounded-[25px] px-6 py-12 text-center">
                    <span className="mb-4 flex size-14 items-center justify-center rounded-[19px] border border-white/90 bg-sky-50/85 text-sky-700 shadow-sm">
                        <AlertCircle className="size-6" aria-hidden="true" />
                    </span>
                    <h2 className="text-lg font-semibold text-(--ink)">
                        Chưa tải được thư viện trình chiếu
                    </h2>
                    <p className="mt-2 max-w-md text-sm leading-6 text-(--muted-ink)">
                        {getApiErrorMessage(
                            error,
                            'Không thể tải dữ liệu từ máy chủ. Vui lòng thử lại.',
                        )}
                    </p>
                    <Button
                        type="button"
                        onClick={() => void refetch()}
                        className="mt-5 h-10 rounded-[13px] bg-blue-600 px-4 text-white hover:bg-blue-700"
                    >
                        Thử tải lại
                    </Button>
                </section>
            ) : templates.length === 0 ? (
                <PresentationEmptyState />
            ) : (
                <section className="space-y-4" aria-busy={isFetching}>
                    {isError && (
                        <p
                            className="rounded-[14px] border border-amber-100 bg-amber-50/75 px-3.5 py-2.5 text-xs text-amber-800"
                            role="status"
                        >
                            Không làm mới được dữ liệu:{' '}
                            {getApiErrorMessage(error)}
                        </p>
                    )}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
                        {templates.map((template) => (
                            <PresentationTemplateCard
                                key={template.id}
                                template={template}
                            />
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}
