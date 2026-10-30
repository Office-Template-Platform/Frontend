// Route thuộc thư viện văn bản; page implementation được tải khi route được mở.
import type { RouteObject } from 'react-router-dom';
import { ROUTE_PATHS } from '@/shared/config/route-paths';

// Giữ URL và lazy page cùng một nhóm để danh sách route có thể tăng theo sản phẩm.
export const documentTemplateRoutes: RouteObject[] = [
    // Danh sách DOCX riêng nằm trong shell sản phẩm để người dùng mở lại file đã lưu.
    {
        path: ROUTE_PATHS.userDocuments,
        lazy: async () => {
            const { UserDocumentsPage } =
                await import('@/pages/document-template-library/user-documents/user-documents-page');

            return { Component: UserDocumentsPage };
        },
    },
    {
        path: ROUTE_PATHS.documentTemplateCatalog,
        lazy: async () => {
            const { DocumentLibraryPage } =
                await import('@/pages/document-template-library/catalog/document-library-page');

            return { Component: DocumentLibraryPage };
        },
    },
];

// Editor DOCX dùng route group độc lập để được render ngoài ProductSiteLayout.
export const documentEditorRoutes: RouteObject[] = [
    {
        path: ROUTE_PATHS.documentEditor,
        lazy: async () => {
            const { DocumentEditorPage } =
                await import('@/pages/document-template-library/editor/document-editor-page');

            return { Component: DocumentEditorPage };
        },
    },
];
