// Endpoint catalog và tạo bản sao PPTX; giữ API riêng theo domain để có thể mở rộng độc lập.
import { apiClient } from '@/shared/api/api-client';
import type { ApiSuccessResponse } from '@/shared/api/api-response.types';
import type { UserDocumentSummary } from '@/services/document-template';
import type {
    CreateUserPresentationRequest,
    PresentationTemplateDetail,
    PresentationTemplateSummary,
} from '../types/presentation-template.types';

// Inject endpoint vào API slice chung để PPTX dùng chung Redux store và cache với các domain khác.
export const presentationTemplateApi = apiClient.injectEndpoints({
    endpoints: (build) => ({
        // [GET] /api/presentation-templates/:templateId
        // Lấy thứ tự, tiêu đề và URL preview từng slide cho hộp thoại xem trước.
        getPresentationTemplate: build.query<
            PresentationTemplateDetail,
            string
        >({
            query: (templateId) =>
                `presentation-templates/${encodeURIComponent(templateId)}`,
            transformResponse: (
                response: ApiSuccessResponse<PresentationTemplateDetail>,
            ) => response.data,
            providesTags: (_result, _error, templateId) => [
                { type: 'PresentationTemplates', id: templateId },
            ],
        }),
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
        // [POST] /api/presentation-templates/:templateId/documents
        // Tạo bản PPTX riêng trong workspace trình duyệt; file mẫu gốc không bị thay đổi.
        createUserPresentation: build.mutation<
            UserDocumentSummary,
            CreateUserPresentationRequest
        >({
            query: ({ templateId, title }) => ({
                url: `presentation-templates/${encodeURIComponent(templateId)}/documents`,
                method: 'POST',
                body: { title: title?.trim() || undefined },
            }),
            // API trả envelope chung; page nhận metadata tài liệu để hiện link tải sau khi tạo.
            transformResponse: (
                response: ApiSuccessResponse<UserDocumentSummary>,
            ) => response.data,
            // Cập nhật danh sách file cá nhân khi bản trình chiếu mới được tạo.
            invalidatesTags: [{ type: 'UserDocuments', id: 'LIST' }],
        }),
    }),
});

// Hook truy vấn được component catalog sử dụng để nhận data và trạng thái loading/error.
export const {
    useCreateUserPresentationMutation,
    useGetPresentationTemplateQuery,
    useListPresentationTemplatesQuery,
} = presentationTemplateApi;
