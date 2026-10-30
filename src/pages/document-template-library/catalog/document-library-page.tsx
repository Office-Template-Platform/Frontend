// Page điều phối query catalog DOCX, bộ lọc, preview và workflow tạo tài liệu.
import { useState } from 'react';
import { TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DocumentCatalogControls } from '@/pages/document-template-library/catalog/components/catalog/document-catalog-controls';
import { DocumentCatalogError } from '@/pages/document-template-library/catalog/components/catalog/document-catalog-error';
import { DocumentCatalogHeading } from '@/pages/document-template-library/catalog/components/catalog/document-catalog-heading';
import { DocumentCatalogPagination } from '@/pages/document-template-library/catalog/components/catalog/document-catalog-pagination';
import { DocumentCatalogSkeleton } from '@/pages/document-template-library/catalog/components/catalog/document-catalog-skeleton';
import { CreateDocumentDialog } from '@/pages/document-template-library/catalog/components/create-document/create-document-dialog';
import { DocumentEmptyState } from '@/pages/document-template-library/catalog/components/empty-state/document-empty-state';
import { DocumentTemplateCard } from '@/pages/document-template-library/catalog/components/template/document-template-card';
import { DocumentTemplatePreviewDialog } from '@/pages/document-template-library/catalog/components/template/document-template-preview-dialog';
import {
    useListDocumentTemplateCategoriesQuery,
    useListDocumentTemplatesQuery,
} from '@/services/document-template';
import type { DocumentTemplateListItem } from '@/services/document-template';
import { useDocumentCatalogFilters } from '@/pages/document-template-library/catalog/hooks/use-document-catalog-filters';
import { getApiErrorMessage } from '@/shared/api/get-api-error-message';

// Ghép các vùng catalog; dữ liệu và filter đến từ API thay vì empty state tĩnh.
export function DocumentLibraryPage() {
    const filters = useDocumentCatalogFilters();
    const { data, error, isError, isFetching, isLoading, refetch } =
        useListDocumentTemplatesQuery(filters.query);
    const {
        data: categories = [],
        error: categoriesError,
        isError: isCategoriesError,
        refetch: refetchCategories,
    } = useListDocumentTemplateCategoriesQuery();
    const [previewTemplate, setPreviewTemplate] =
        useState<DocumentTemplateListItem | null>(null);
    const [creationTemplate, setCreationTemplate] =
        useState<DocumentTemplateListItem | null>(null);

    // Chọn mẫu mở preview; modal chi tiết sẽ chịu trách nhiệm gọi endpoint ID riêng.
    function handlePreview(template: DocumentTemplateListItem): void {
        setPreviewTemplate(template);
    }

    // Chuyển từ preview sang form tạo để chỉ tồn tại một modal ở mỗi thời điểm.
    function handleUseTemplate(template: DocumentTemplateListItem): void {
        setPreviewTemplate(null);
        setCreationTemplate(template);
    }

    const templates = data?.items ?? [];
    const hasFilters = Boolean(
        filters.query.search || filters.query.categoryId,
    );

    return (
        <main
            className="catalog-page flex min-w-0 flex-1 flex-col"
            id="main-content"
        >
            <DocumentCatalogHeading />
            <div className="space-y-4">
                <DocumentCatalogControls
                    categories={categories}
                    categoryId={filters.categoryId}
                    searchValue={filters.searchValue}
                    total={data?.total}
                    isFetching={isFetching}
                    onSearchChange={filters.handleSearchChange}
                    onCategoryChange={filters.handleCategoryChange}
                />

                {isCategoriesError && (
                    <div
                        className="flex flex-wrap items-center justify-between gap-2 rounded-[14px] border border-amber-100 bg-amber-50/75 px-3.5 py-2 text-xs text-amber-800"
                        role="status"
                    >
                        <span className="flex items-center gap-2">
                            <TriangleAlert
                                className="size-3.5 text-amber-600"
                                aria-hidden="true"
                            />
                            Danh mục chưa tải được:{' '}
                            {getApiErrorMessage(categoriesError)}
                        </span>
                        <Button
                            type="button"
                            variant="link"
                            size="sm"
                            className="h-7 px-1 font-semibold text-amber-900"
                            onClick={() => void refetchCategories()}
                        >
                            Thử lại
                        </Button>
                    </div>
                )}

                {isError && !data ? (
                    <DocumentCatalogError
                        error={error}
                        onRetry={() => void refetch()}
                    />
                ) : isLoading && !data ? (
                    <DocumentCatalogSkeleton />
                ) : templates.length === 0 ? (
                    <DocumentEmptyState
                        hasFilters={hasFilters}
                        onClearFilters={filters.handleClearFilters}
                    />
                ) : (
                    <>
                        {isError && data && (
                            <p
                                className="rounded-[14px] border border-amber-100 bg-amber-50/75 px-3.5 py-2.5 text-xs text-amber-800"
                                role="status"
                            >
                                Không làm mới được dữ liệu:{' '}
                                {getApiErrorMessage(error)}
                            </p>
                        )}
                        <div
                            className="grid grid-cols-1 gap-4 transition-opacity md:grid-cols-2 2xl:grid-cols-3"
                            aria-busy={isFetching}
                        >
                            {templates.map((template) => (
                                <DocumentTemplateCard
                                    key={template.id}
                                    template={template}
                                    onPreview={handlePreview}
                                    onUse={handleUseTemplate}
                                />
                            ))}
                        </div>
                        {data && data.totalPages > 1 && (
                            <DocumentCatalogPagination
                                page={data.page}
                                totalPages={data.totalPages}
                                total={data.total}
                                onPageChange={filters.handlePageChange}
                            />
                        )}
                    </>
                )}
            </div>

            <DocumentTemplatePreviewDialog
                template={previewTemplate}
                onClose={() => setPreviewTemplate(null)}
                onUse={handleUseTemplate}
            />
            <CreateDocumentDialog
                template={creationTemplate}
                onClose={() => setCreationTemplate(null)}
            />
        </main>
    );
}
