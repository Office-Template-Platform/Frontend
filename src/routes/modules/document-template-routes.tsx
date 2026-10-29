// Route thuộc thư viện văn bản; page implementation được tải khi route được mở.
import type { RouteObject } from 'react-router-dom';
import { ROUTE_PATHS } from '@/shared/config/route-paths';

// Giữ URL và lazy page cùng một nhóm để danh sách route có thể tăng theo sản phẩm.
export const documentTemplateRoutes: RouteObject[] = [
    {
        path: ROUTE_PATHS.documentTemplateCatalog,
        lazy: async () => {
            const { DocumentLibraryPage } =
                await import('@/pages/document-template-library/catalog/document-library-page');

            return { Component: DocumentLibraryPage };
        },
    },
];
