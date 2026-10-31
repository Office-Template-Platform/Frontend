// Page điều phối catalog PPTX với header, bộ lọc và lưới card cùng cấu trúc DOCX.
import { useMemo, useState } from 'react';
import { AlertCircle, SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PresentationCatalogControls } from '@/pages/presentation-template-library/catalog/components/presentation-catalog-controls';
import { PresentationCatalogHeading } from '@/pages/presentation-template-library/catalog/components/presentation-catalog-heading';
import { PresentationCatalogSkeleton } from '@/pages/presentation-template-library/catalog/components/presentation-catalog-skeleton';
import { PresentationEmptyState } from '@/pages/presentation-template-library/catalog/components/presentation-empty-state';
import { PresentationTemplateCard } from '@/pages/presentation-template-library/catalog/components/presentation-template-card';
import { PresentationTemplatePreviewDialog } from '@/pages/presentation-template-library/catalog/components/presentation-template-preview-dialog';
import { CreatePresentationDialog } from '@/pages/presentation-template-library/catalog/components/create-presentation/create-presentation-dialog';
import { usePresentationCatalogFilters } from '@/pages/presentation-template-library/catalog/hooks/use-presentation-catalog-filters';
import type { PresentationCategoryOption } from '@/pages/presentation-template-library/catalog/components/presentation-catalog-controls';
import { useListPresentationTemplatesQuery } from '@/services/presentation-template';
import type { PresentationTemplateSummary } from '@/services/presentation-template';
import { getApiErrorMessage } from '@/shared/api/get-api-error-message';

// Chuẩn hóa tên danh mục và số lượng để bộ lọc bám theo dữ liệu backend trả về.
function buildPresentationCategories(
    templates: PresentationTemplateSummary[],
): PresentationCategoryOption[] {
    const counts = new Map<string, number>();

    for (const template of templates) {
        const category = template.category.trim();
        if (category) {
            counts.set(category, (counts.get(category) ?? 0) + 1);
        }
    }

    return [...counts.entries()]
        .map(([name, count]) => ({ name, count }))
        .sort((first, second) => first.name.localeCompare(second.name, 'vi'));
}

// Render catalog và giữ lựa chọn preview/filter ở page; danh sách gốc vẫn do RTK Query quản lý.
export function PresentationLibraryPage() {
    const { data, error, isError, isFetching, isLoading, refetch } =
        useListPresentationTemplatesQuery();
    const templates = data ?? [];
    const filters = usePresentationCatalogFilters();
    const [previewTemplate, setPreviewTemplate] =
        useState<PresentationTemplateSummary | null>(null);
    const [selectedTemplate, setSelectedTemplate] =
        useState<PresentationTemplateSummary | null>(null);

    // Chuyển từ card hoặc preview sang form tạo để chỉ mở một modal tại một thời điểm.
    function handleUseTemplate(template: PresentationTemplateSummary): void {
        setPreviewTemplate(null);
        setSelectedTemplate(template);
    }

    const categories = useMemo(
        () => buildPresentationCategories(templates),
        [templates],
    );
    // Áp dụng tìm kiếm theo tên/mô tả và danh mục trên bộ dữ liệu catalog đã tải.
    const visibleTemplates = useMemo(() => {
        const normalizedSearch = filters.search.toLocaleLowerCase('vi');

        return templates.filter((template) => {
            const matchesCategory =
                filters.selectedCategory === null ||
                template.category === filters.selectedCategory;
            const searchableText =
                `${template.name} ${template.description} ${template.category}`.toLocaleLowerCase(
                    'vi',
                );
            const matchesSearch =
                !normalizedSearch || searchableText.includes(normalizedSearch);

            return matchesCategory && matchesSearch;
        });
    }, [filters.search, filters.selectedCategory, templates]);

    return (
        <main
            className="catalog-page flex min-w-0 flex-1 flex-col"
            id="main-content"
        >
            <PresentationCatalogHeading />
            <div className="space-y-4">
                {isError && !data ? (
                    <section
                        className="glass-panel flex flex-col items-center rounded-[25px] px-6 py-12 text-center"
                        role="alert"
                    >
                        <span className="mb-4 flex size-14 items-center justify-center rounded-[19px] border border-white/90 bg-blue-50/85 text-blue-700 shadow-sm">
                            <AlertCircle
                                className="size-6"
                                aria-hidden="true"
                            />
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
                ) : (
                    <>
                        <PresentationCatalogControls
                            categories={categories}
                            selectedCategory={filters.selectedCategory}
                            searchValue={filters.searchValue}
                            resultCount={visibleTemplates.length}
                            totalCount={templates.length}
                            isFetching={isFetching}
                            onCategoryChange={filters.setSelectedCategory}
                            onSearchChange={filters.setSearchValue}
                        />

                        {isError && data && (
                            <p
                                className="rounded-[14px] border border-amber-100 bg-amber-50/75 px-3.5 py-2.5 text-xs text-amber-800"
                                role="status"
                            >
                                Không làm mới được dữ liệu:{' '}
                                {getApiErrorMessage(error)}
                            </p>
                        )}

                        {isLoading && !data ? (
                            <PresentationCatalogSkeleton />
                        ) : templates.length === 0 ? (
                            <PresentationEmptyState />
                        ) : visibleTemplates.length === 0 ? (
                            <section
                                className="glass-panel flex flex-col items-center rounded-[25px] px-6 py-12 text-center"
                                aria-live="polite"
                            >
                                <span className="mb-4 flex size-14 items-center justify-center rounded-[19px] border border-white/90 bg-blue-50/85 text-blue-700 shadow-sm">
                                    <SearchX
                                        className="size-6"
                                        aria-hidden="true"
                                    />
                                </span>
                                <h2 className="text-lg font-semibold text-(--ink)">
                                    Chưa tìm thấy mẫu phù hợp
                                </h2>
                                <p className="mt-2 max-w-md text-sm leading-6 text-(--muted-ink)">
                                    Thử từ khóa khác hoặc xóa bộ lọc để xem toàn
                                    bộ mẫu trình chiếu.
                                </p>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        filters.handleClearFilters();
                                    }}
                                    className="mt-5 h-10 rounded-[13px] border-blue-100 bg-white/80 px-4 text-blue-800 hover:bg-blue-50"
                                >
                                    Xóa bộ lọc
                                </Button>
                            </section>
                        ) : (
                            <section
                                className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3"
                                aria-label="Danh sách mẫu trình chiếu"
                                aria-busy={isFetching}
                            >
                                {visibleTemplates.map((template) => (
                                    <PresentationTemplateCard
                                        key={template.id}
                                        template={template}
                                        onUse={handleUseTemplate}
                                        onPreview={setPreviewTemplate}
                                    />
                                ))}
                            </section>
                        )}
                    </>
                )}
            </div>

            <PresentationTemplatePreviewDialog
                template={previewTemplate}
                onClose={() => setPreviewTemplate(null)}
                onUse={handleUseTemplate}
            />
            <CreatePresentationDialog
                template={selectedTemplate}
                onClose={() => setSelectedTemplate(null)}
            />
        </main>
    );
}
