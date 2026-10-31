// Định nghĩa toàn bộ endpoint DOCX ở tầng service để page chỉ tập trung vào giao diện.
// Các endpoint được inject vào apiClient dùng chung, nhờ đó Redux Toolkit Query quản lý
// request state, cache và middleware tại một nơi thay vì tạo thêm một HTTP client riêng.
import { apiClient } from '@/shared/api/api-client';
import type { ApiSuccessResponse } from '@/shared/api/api-response.types';
import type {
    CreateUserDocumentRequest,
    DocumentTemplateCategory,
    DocumentTemplateDetail,
    DocumentTemplateListQuery,
    OnlyOfficeEditorConfigResponse,
    PagedUserDocuments,
    PagedDocumentTemplates,
    SaveUserDocumentRequest,
    UserDocumentListQuery,
    UserDocumentSummary,
} from '../types/document-template.types';

// Mở rộng API slice dùng chung bằng các thao tác đọc mẫu và tạo/lưu tài liệu DOCX.
export const documentTemplateApi = apiClient.injectEndpoints({
    endpoints: (build) => ({
        // [GET] /api/document-templates
        // Lấy catalog DOCX theo trang. Request nhận `page`, `limit` và các bộ lọc tùy chọn
        // `search`, `categoryId`; response data gồm `items`, tổng số bản ghi và thông tin trang.
        // Cache được gắn theo từng mẫu và tag LIST để truy vấn có thể được tái sử dụng/làm mới.
        listDocumentTemplates: build.query<
            PagedDocumentTemplates,
            DocumentTemplateListQuery
        >({
            query: (params) => ({
                url: 'document-templates',
                params,
            }),
            // Bỏ envelope { success, data, meta } để hook chỉ trả về payload `data` cho UI.
            transformResponse: (
                response: ApiSuccessResponse<PagedDocumentTemplates>,
            ) => response.data,
            // Gắn cache vào từng mẫu và toàn danh sách để có thể làm mới đúng phạm vi.
            providesTags: (result) =>
                result
                    ? [
                          ...result.items.map(({ id }) => ({
                              type: 'DocumentTemplates' as const,
                              id,
                          })),
                          { type: 'DocumentTemplates', id: 'LIST' },
                      ]
                    : [{ type: 'DocumentTemplates', id: 'LIST' }],
        }),
        // [GET] /api/document-templates/categories
        // Lấy danh mục DOCX để dựng bộ lọc và hiển thị số mẫu của từng nhóm.
        // Request không có tham số; response data là mảng DocumentTemplateCategory.
        // Cache danh mục tách biệt với catalog mẫu vì hai endpoint có vòng đời dữ liệu khác nhau.
        listDocumentTemplateCategories: build.query<
            DocumentTemplateCategory[],
            void
        >({
            query: () => 'document-templates/categories',
            // Chuyển response envelope thành mảng danh mục cho component sử dụng trực tiếp.
            transformResponse: (
                response: ApiSuccessResponse<DocumentTemplateCategory[]>,
            ) => response.data,
            // Danh mục có cache riêng, độc lập với cache danh sách mẫu.
            providesTags: [{ type: 'DocumentTemplateCategories', id: 'LIST' }],
        }),
        // [GET] /api/document-templates/:templateId
        // Lấy metadata chi tiết của một mẫu khi người dùng mở hộp thoại xem trước.
        // Request nhận ID mẫu trên URL; response data bổ sung thời điểm tạo/cập nhật metadata.
        // Cache theo ID để lần mở lại cùng một mẫu có thể dùng lại kết quả đã tải.
        getDocumentTemplate: build.query<DocumentTemplateDetail, string>({
            // Encode ID để giữ URL hợp lệ nếu định danh chứa ký tự đặc biệt.
            query: (templateId) =>
                `document-templates/${encodeURIComponent(templateId)}`,
            // UI nhận object chi tiết thay vì phải hiểu cấu trúc envelope của backend.
            transformResponse: (
                response: ApiSuccessResponse<DocumentTemplateDetail>,
            ) => response.data,
            // ID được dùng làm cache key để các lần mở lại mẫu có thể tái sử dụng dữ liệu.
            providesTags: (_result, _error, id) => [
                { type: 'DocumentTemplates', id },
            ],
        }),
        // [GET] /api/user-documents
        // Liệt kê tài liệu trong workspace hiện tại, với tìm kiếm tiêu đề và phân trang từ backend.
        // Danh sách luôn được sắp theo lần cập nhật gần nhất nên page có thể nêu bật tài liệu đầu tiên.
        listUserDocuments: build.query<
            PagedUserDocuments,
            UserDocumentListQuery
        >({
            query: (params) => ({
                url: 'user-documents',
                params,
            }),
            transformResponse: (
                response: ApiSuccessResponse<PagedUserDocuments>,
            ) => response.data,
            // Tag từng tài liệu và LIST để thay đổi sau tạo/lưu làm mới đúng các trang liên quan.
            providesTags: (result) =>
                result
                    ? [
                          ...result.items.map(({ id }) => ({
                              type: 'UserDocuments' as const,
                              id,
                          })),
                          { type: 'UserDocuments', id: 'LIST' },
                      ]
                    : [{ type: 'UserDocuments', id: 'LIST' }],
        }),
        // [GET] /api/user-documents/trash/items
        // Lấy riêng tài liệu đã xóa mềm; fileType còn được giữ để UI hiện biểu tượng DOCX/PPTX.
        listTrashedUserDocuments: build.query<
            PagedUserDocuments,
            UserDocumentListQuery
        >({
            query: (params) => ({
                url: 'user-documents/trash/items',
                params,
            }),
            transformResponse: (
                response: ApiSuccessResponse<PagedUserDocuments>,
            ) => response.data,
            providesTags: (result) =>
                result
                    ? [
                          ...result.items.map(({ id }) => ({
                              type: 'UserDocumentTrash' as const,
                              id,
                          })),
                          { type: 'UserDocumentTrash', id: 'LIST' },
                      ]
                    : [{ type: 'UserDocumentTrash', id: 'LIST' }],
        }),
        // [GET] /api/user-documents/:documentId
        // Đọc metadata tài liệu để hiển thị tiêu đề và nhận biết callback đã lưu revision mới.
        // Khi người dùng rời editor sau chỉnh sửa, page bật polling ngắn để chờ ONLYOFFICE callback.
        getUserDocument: build.query<UserDocumentSummary, string>({
            query: (documentId) =>
                `user-documents/${encodeURIComponent(documentId)}`,
            transformResponse: (
                response: ApiSuccessResponse<UserDocumentSummary>,
            ) => response.data,
            providesTags: (_result, _error, documentId) => [
                { type: 'UserDocuments', id: documentId },
            ],
        }),
        // [GET] /api/user-documents/:documentId/editor-config
        // Lấy cấu hình ký theo document revision; luôn refetch khi route editor mở để tránh JWT hết hạn.
        getUserDocumentEditorConfig: build.query<
            OnlyOfficeEditorConfigResponse,
            string
        >({
            query: (documentId) =>
                `user-documents/${encodeURIComponent(documentId)}/editor-config`,
            transformResponse: (
                response: ApiSuccessResponse<OnlyOfficeEditorConfigResponse>,
            ) => response.data,
            keepUnusedDataFor: 0,
        }),
        // [POST] /api/document-templates/:templateId/documents
        // Yêu cầu backend tạo bản DOCX riêng của người dùng từ phiên bản mẫu hiện hành.
        // Body nhận `title` tùy chọn; nếu tên trống, API sẽ dùng tên của mẫu nguồn.
        // Response data là metadata UserDocumentSummary; phát tag LIST để đồng bộ trang tài liệu riêng.
        createUserDocument: build.mutation<
            UserDocumentSummary,
            CreateUserDocumentRequest
        >({
            // Chuẩn hóa tiêu đề: bỏ khoảng trắng thừa và không gửi chuỗi rỗng lên backend.
            query: ({ templateId, title }) => ({
                url: `document-templates/${encodeURIComponent(templateId)}/documents`,
                method: 'POST',
                body: { title: title?.trim() || undefined },
            }),
            // Trả metadata tài liệu mới, bao gồm trạng thái và URL tải nếu đã sẵn sàng.
            transformResponse: (
                response: ApiSuccessResponse<UserDocumentSummary>,
            ) => response.data,
            // Làm mới danh sách tài liệu người dùng sau khi tạo bản sao thành công.
            invalidatesTags: [{ type: 'UserDocuments', id: 'LIST' }],
        }),
        // [PUT] /api/user-documents/:documentId/content
        // Cập nhật nội dung của tài liệu riêng bằng file DOCX người dùng đã chỉnh sửa.
        // Request là multipart/form-data với field `file`; backend xác thực file trước khi lưu.
        // Response data trả metadata mới; phát tag invalidation theo documentId cho truy vấn liên quan.
        saveUserDocument: build.mutation<
            UserDocumentSummary,
            SaveUserDocumentRequest
        >({
            // Dùng FormData để gửi file nhị phân; trình duyệt tự thêm multipart boundary.
            query: ({ documentId, file }) => {
                const body = new FormData();
                body.append('file', file, file.name);

                return {
                    // Encode ID và chỉ ghi vào tài liệu người dùng, không sửa file mẫu gốc.
                    url: `user-documents/${encodeURIComponent(documentId)}/content`,
                    method: 'PUT',
                    body,
                };
            },
            // Trả lại metadata mới để UI đồng bộ trạng thái sau khi lưu.
            transformResponse: (
                response: ApiSuccessResponse<UserDocumentSummary>,
            ) => response.data,
            // Làm mới cả metadata chi tiết và danh sách để thời gian cập nhật được phản ánh ngay.
            invalidatesTags: (_result, _error, { documentId }) => [
                { type: 'UserDocuments', id: documentId },
                { type: 'UserDocuments', id: 'LIST' },
            ],
        }),
        // [DELETE] /api/user-documents/:documentId
        // Đưa tài liệu vào thùng rác; backend giữ file vật lý và metadata để hỗ trợ khôi phục.
        deleteUserDocument: build.mutation<void, string>({
            query: (documentId) => ({
                url: `user-documents/${encodeURIComponent(documentId)}`,
                method: 'DELETE',
            }),
            // Làm mới danh sách/phân trang và metadata tài liệu sau khi endpoint trả 204.
            invalidatesTags: (_result, _error, documentId) => [
                { type: 'UserDocuments', id: documentId },
                { type: 'UserDocuments', id: 'LIST' },
                { type: 'UserDocumentTrash', id: documentId },
                { type: 'UserDocumentTrash', id: 'LIST' },
            ],
        }),
        // [PATCH] /api/user-documents/:documentId/restore
        // Bỏ deleted_at ở tài liệu trong thùng rác và làm mới cả hai danh sách liên quan.
        restoreUserDocument: build.mutation<void, string>({
            query: (documentId) => ({
                url: `user-documents/${encodeURIComponent(documentId)}/restore`,
                method: 'PATCH',
            }),
            invalidatesTags: (_result, _error, documentId) => [
                { type: 'UserDocuments', id: documentId },
                { type: 'UserDocuments', id: 'LIST' },
                { type: 'UserDocumentTrash', id: documentId },
                { type: 'UserDocumentTrash', id: 'LIST' },
            ],
        }),
    }),
});

// React hooks do RTK Query sinh ra từ endpoint definitions ở trên.
// Page và component dùng các hook này để đọc dữ liệu, theo dõi trạng thái hoặc gọi mutation.
export const {
    useCreateUserDocumentMutation,
    useDeleteUserDocumentMutation,
    useGetDocumentTemplateQuery,
    useGetUserDocumentEditorConfigQuery,
    useGetUserDocumentQuery,
    useListUserDocumentsQuery,
    useListTrashedUserDocumentsQuery,
    useListDocumentTemplateCategoriesQuery,
    useListDocumentTemplatesQuery,
    useRestoreUserDocumentMutation,
    useSaveUserDocumentMutation,
} = documentTemplateApi;
