// Page tổng hợp catalog PPTX; phần tiêu đề và empty state được quản lý theo component riêng.
import { PresentationCatalogHeading } from '@/pages/presentation-template-library/catalog/components/presentation-catalog-heading';
import { PresentationEmptyState } from '@/pages/presentation-template-library/catalog/components/presentation-empty-state';

// Ghép các vùng chính của catalog để route không chứa chi tiết trình bày từng vùng.
export function PresentationLibraryPage() {
    return (
        <main
            className="catalog-page flex min-w-0 flex-1 flex-col"
            id="main-content"
        >
            <PresentationCatalogHeading />
            <PresentationEmptyState />
        </main>
    );
}
