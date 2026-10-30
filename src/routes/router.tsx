// Registry tách shell thư viện khỏi các route hệ thống cần bố cục độc lập.
import {
    createBrowserRouter,
    RouterProvider,
    type RouteObject,
} from 'react-router-dom';
import { EmptyLayout } from '@/layouts/empty-shell/empty-layout';
import { ProductSiteLayout } from '@/layouts/product-shell/product-site-layout';
import { ROUTE_PATHS } from '@/shared/config/route-paths';
import {
    documentEditorRoutes,
    documentTemplateRoutes,
} from '@/routes/modules/document-template-routes';
import { presentationTemplateRoutes } from '@/routes/modules/presentation-template-routes';

// Các trang ít dùng được tách chunk để người dùng chỉ tải giao diện của route đã mở.
const homeRoute: RouteObject = {
    path: ROUTE_PATHS.home,
    lazy: async () => {
        const { HomePage } = await import('@/pages/home/home-page');

        return { Component: HomePage };
    },
};

const notFoundRoute: RouteObject = {
    path: '*',
    lazy: async () => {
        const { NotFoundPage } =
            await import('@/pages/system/not-found/not-found-page');

        return { Component: NotFoundPage };
    },
};

// Đặt editor và trang hệ thống ngoài shell catalog để editor chiếm trọn chiều cao cửa sổ.
const router = createBrowserRouter([
    {
        Component: ProductSiteLayout,
        children: [
            homeRoute,
            ...documentTemplateRoutes,
            ...presentationTemplateRoutes,
        ],
    },
    {
        Component: EmptyLayout,
        children: [...documentEditorRoutes, notFoundRoute],
    },
]);

// Cung cấp router cho ứng dụng; URL và page ownership nằm trong registry phía trên.
export function AppRouter() {
    return <RouterProvider router={router} />;
}
