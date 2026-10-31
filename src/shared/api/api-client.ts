// Cấu hình RTK Query cho API có response envelope và file nhị phân.
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/config/api.config';

export const apiClient = createApi({
    reducerPath: 'officeTemplateApi',
    // API chạy khác cổng với Vite; include để gửi và nhận cookie HttpOnly của anonymous workspace.
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        credentials: 'include',
    }),
    tagTypes: [
        'DocumentTemplates',
        'DocumentTemplateCategories',
        'UserDocuments',
        'UserDocumentTrash',
        'PresentationTemplates',
    ],
    endpoints: () => ({}),
});

// Ghép đường dẫn file API với origin/base path để preview hoạt động cả khi web khác cổng.
export function getApiResourceUrl(resourcePath: string): string {
    return new URL(resourcePath, `${API_BASE_URL}/`).toString();
}
