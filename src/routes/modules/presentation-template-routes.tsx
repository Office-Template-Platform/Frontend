// Route thuộc thư viện trình chiếu; page implementation được tải theo nhu cầu.
import type { RouteObject } from 'react-router-dom';
import { ROUTE_PATHS } from '@/shared/config/route-paths';

// Giữ URL và lazy page cùng một nhóm để danh sách route có thể tăng theo sản phẩm.
export const presentationTemplateRoutes: RouteObject[] = [
    {
        path: ROUTE_PATHS.presentationTemplateCatalog,
        lazy: async () => {
            const { PresentationLibraryPage } =
                await import('@/pages/presentation-template-library/catalog/presentation-library-page');

            return { Component: PresentationLibraryPage };
        },
    },
];
