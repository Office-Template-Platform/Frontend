// Trang điều phối danh sách DOCX riêng; truy vấn, lọc và từng trạng thái nằm ở feature con.
import { useListUserDocumentsQuery } from '@/services/document-template';
import { UserDocumentsCollection } from '@/pages/document-template-library/user-documents/components/user-documents-collection';
import { UserDocumentsHeader } from '@/pages/document-template-library/user-documents/components/user-documents-header';
import { UserDocumentsPagination } from '@/pages/document-template-library/user-documents/components/user-documents-pagination';
import {
    UserDocumentsEmptyState,
    UserDocumentsErrorState,
    UserDocumentsSkeleton,
} from '@/pages/document-template-library/user-documents/components/user-documents-states';
import { useUserDocumentsFilters } from '@/pages/document-template-library/user-documents/hooks/use-user-documents-filters';
import type { UserDocumentSummary } from '@/services/document-template';
import { getApiErrorMessage } from '@/shared/api/get-api-error-message';

// Tải tài liệu theo workspace hiện tại và buộc làm mới khi người dùng quay lại từ editor.
export function UserDocumentsPage() {
    const filters = useUserDocumentsFilters();
    const { currentData, error, isError, isFetching, refetch } =
        useListUserDocumentsQuery(filters.query, {
            refetchOnMountOrArgChange: true,
        });
    const documents = currentData?.items ?? [];

    // Giữ trang lỗi riêng để retry không làm mất truy vấn đang hiển thị.
    function handleRetry(): void {
        void refetch();
    }

    const recentDocument: UserDocumentSummary | null =
        currentData?.page === 1 ? (documents[0] ?? null) : null;
    const otherDocuments = recentDocument ? documents.slice(1) : documents;

    return (
        <main className="flex min-w-0 flex-1 flex-col" id="main-content">
            <UserDocumentsHeader
                searchValue={filters.searchValue}
                isFetching={isFetching && Boolean(currentData)}
                total={currentData?.total}
                onSearchChange={filters.handleSearchChange}
                onClearSearch={filters.handleClearSearch}
            />

            {isError && !currentData ? (
                <UserDocumentsErrorState error={error} onRetry={handleRetry} />
            ) : isFetching && !currentData ? (
                <UserDocumentsSkeleton />
            ) : documents.length === 0 ? (
                <UserDocumentsEmptyState
                    hasSearch={filters.hasSearch}
                    onClearSearch={filters.handleClearSearch}
                />
            ) : (
                <>
                    {isError && currentData && (
                        <p
                            className="mb-4 rounded-[14px] border border-amber-100 bg-amber-50/75 px-3.5 py-2.5 text-xs text-amber-800"
                            role="status"
                        >
                            Không làm mới được danh sách:{' '}
                            {getApiErrorMessage(error)}
                        </p>
                    )}
                    <div aria-busy={isFetching}>
                        <UserDocumentsCollection
                            recentDocument={recentDocument}
                            documents={otherDocuments}
                        />
                        {currentData && currentData.totalPages > 1 && (
                            <UserDocumentsPagination
                                page={currentData.page}
                                totalPages={currentData.totalPages}
                                total={currentData.total}
                                onPageChange={filters.handlePageChange}
                            />
                        )}
                    </div>
                </>
            )}
        </main>
    );
}
