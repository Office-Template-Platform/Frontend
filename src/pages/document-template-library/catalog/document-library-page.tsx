// Page tổng hợp catalog DOCX; phần tiêu đề và empty state được quản lý theo component riêng.
import { DocumentCatalogHeading } from '@/pages/document-template-library/catalog/components/document-catalog-heading';
import { DocumentEmptyState } from '@/pages/document-template-library/catalog/components/document-empty-state';

// Ghép các vùng chính của catalog để route không chứa chi tiết trình bày từng vùng.
export function DocumentLibraryPage() {
    return (
        <main
            className="catalog-page flex min-w-0 flex-1 flex-col"
            id="main-content"
        >
            <DocumentCatalogHeading />
            <DocumentEmptyState />
        </main>
    );
}
