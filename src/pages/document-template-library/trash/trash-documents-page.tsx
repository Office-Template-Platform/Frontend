// Điều phối truy vấn thùng rác, khôi phục tài liệu và trạng thái trang theo URL.
import { useState } from 'react';
import { toast } from 'sonner';
import {
    useListTrashedUserDocumentsQuery,
    useRestoreUserDocumentMutation,
} from '@/services/document-template';
import type { UserDocumentSummary } from '@/services/document-template';
import { UserDocumentsPagination } from '@/pages/document-template-library/user-documents/components/user-documents-pagination';
import { useUserDocumentsFilters } from '@/pages/document-template-library/user-documents/hooks/use-user-documents-filters';
import { TrashDocumentsHeader } from '@/pages/document-template-library/trash/components/trash-documents-header';
import { TrashDocumentsList } from '@/pages/document-template-library/trash/components/trash-documents-list';
import {
    TrashDocumentsEmptyState,
    TrashDocumentsErrorState,
    TrashDocumentsSkeleton,
} from '@/pages/document-template-library/trash/components/trash-documents-states';
import { getApiErrorMessage } from '@/shared/api/get-api-error-message';

// Tải riêng tài liệu đã xóa mềm và chuyển chúng về danh sách chính bằng endpoint restore.
export function TrashDocumentsPage() {
    const filters = useUserDocumentsFilters();
    const [restoringDocumentId, setRestoringDocumentId] = useState<
        string | null
    >(null);
    const [restoreUserDocument, { isLoading: isRestoring }] =
        useRestoreUserDocumentMutation();
    const { currentData, error, isError, isFetching, refetch } =
        useListTrashedUserDocumentsQuery(filters.query, {
            refetchOnMountOrArgChange: true,
        });
    const documents = currentData?.items ?? [];

    // Thử tải lại truy vấn hiện tại mà không thay đổi tìm kiếm hoặc trang đang mở.
    function handleRetry(): void {
        void refetch();
    }

    // Khôi phục tài liệu rồi đưa trang lùi lại nếu vừa làm rỗng trang hiện tại.
    async function handleRestore(document: UserDocumentSummary): Promise<void> {
        setRestoringDocumentId(document.id);

        try {
            await restoreUserDocument(document.id).unwrap();
            toast.success(`Đã khôi phục “${document.title}”.`);

            if (documents.length === 1 && currentData && currentData.page > 1) {
                filters.handlePageChange(currentData.page - 1);
            }
        } catch (restoreError) {
            toast.error(
                getApiErrorMessage(
                    restoreError,
                    'Không thể khôi phục tài liệu này. Hãy thử lại.',
                ),
            );
        } finally {
            setRestoringDocumentId(null);
        }
    }

    return (
        <main className="flex min-w-0 flex-1 flex-col" id="main-content">
            <TrashDocumentsHeader
                searchValue={filters.searchValue}
                isFetching={isFetching && Boolean(currentData)}
                total={currentData?.total}
                onSearchChange={filters.handleSearchChange}
                onClearSearch={filters.handleClearSearch}
            />

            {isError && !currentData ? (
                <TrashDocumentsErrorState error={error} onRetry={handleRetry} />
            ) : isFetching && !currentData ? (
                <TrashDocumentsSkeleton />
            ) : documents.length === 0 ? (
                <TrashDocumentsEmptyState
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
                        <TrashDocumentsList
                            documents={documents}
                            restoringDocumentId={restoringDocumentId}
                            isRestoring={isRestoring}
                            onRestore={handleRestore}
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
