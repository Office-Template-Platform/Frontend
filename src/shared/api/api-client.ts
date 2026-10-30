// Cấu hình RTK Query cho API có response envelope và file nhị phân.
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/config/api.config';

export const apiClient = createApi({
    reducerPath: 'officeTemplateApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    tagTypes: [
        'DocumentTemplates',
        'DocumentTemplateCategories',
        'UserDocuments',
        'PresentationTemplates',
    ],
    endpoints: () => ({}),
});

// Ghép đường dẫn file API với origin/base path để preview hoạt động cả khi web khác cổng.
export function getApiResourceUrl(resourcePath: string): string {
    return new URL(resourcePath, `${API_BASE_URL}/`).toString();
}
