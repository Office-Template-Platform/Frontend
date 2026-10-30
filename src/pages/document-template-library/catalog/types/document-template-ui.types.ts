// Hợp đồng props giữa các component của catalog DOCX.
import type {
    DocumentTemplateCategory,
    DocumentTemplateListItem,
} from '@/services/document-template';

export type DocumentTemplateCardProps = {
    template: DocumentTemplateListItem;
    onPreview: (template: DocumentTemplateListItem) => void;
    onUse: (template: DocumentTemplateListItem) => void;
};

export type DocumentCatalogControlsProps = {
    categories: DocumentTemplateCategory[];
    categoryId: string | null;
    searchValue: string;
    total: number | undefined;
    isFetching: boolean;
    onSearchChange: (value: string) => void;
    onCategoryChange: (categoryId: string | null) => void;
};

export type DocumentCatalogPaginationProps = {
    page: number;
    totalPages: number;
    total: number;
    onPageChange: (page: number) => void;
};

export type DocumentEmptyStateProps = {
    hasFilters: boolean;
    onClearFilters: () => void;
};

export type DocumentCatalogErrorProps = {
    error: unknown;
    onRetry: () => void;
};

export type DocumentTemplateDialogProps = {
    template: DocumentTemplateListItem | null;
    onClose: () => void;
    onUse: (template: DocumentTemplateListItem) => void;
};
