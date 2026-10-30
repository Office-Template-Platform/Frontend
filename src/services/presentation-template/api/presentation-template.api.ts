// Endpoint truy vấn catalog PPTX; giữ API riêng theo domain để có thể mở rộng độc lập.
// Hiện chỉ khai báo thao tác đọc mà backend hỗ trợ, không giả lập dữ liệu hay hành động khác.
import { apiClient } from '@/shared/api/api-client';
import type { ApiSuccessResponse } from '@/shared/api/api-response.types';
import type { PresentationTemplateSummary } from '../types/presentation-template.types';

// Inject endpoint vào API slice chung để PPTX dùng chung Redux store và cache với các domain khác.
export const presentationTemplateApi = apiClient.injectEndpoints({
    endpoints: (build) => ({
        // [GET] /api/presentation-templates
        // Lấy danh sách metadata bộ mẫu PPTX đã được backend công bố.
        // Endpoint hiện không nhận query parameters; response data là mảng PresentationTemplateSummary.
        // API có thể trả mảng rỗng khi chưa có mẫu; frontend giữ nguyên trạng thái đó, không tạo dữ liệu giả.
        // Cache gắn theo ID từng mẫu cùng tag LIST để sẵn sàng invalidation khi backend có mutation.
        listPresentationTemplates: build.query<
            PresentationTemplateSummary[],
            void
        >({
            query: () => 'presentation-templates',
            // Bóc trường data khỏi envelope { success, data, meta } trước khi đưa vào cache.
            transformResponse: (
                response: ApiSuccessResponse<PresentationTemplateSummary[]>,
            ) => response.data,
            // Gắn cache theo từng mẫu và cả danh sách để hỗ trợ invalidation khi có mutation sau này.
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: 'PresentationTemplates' as const,
                              id,
                          })),
                          { type: 'PresentationTemplates', id: 'LIST' },
                      ]
                    : [{ type: 'PresentationTemplates', id: 'LIST' }],
        }),
    }),
});

// Hook truy vấn được component catalog sử dụng để nhận data và trạng thái loading/error.
export const { useListPresentationTemplatesQuery } = presentationTemplateApi;
