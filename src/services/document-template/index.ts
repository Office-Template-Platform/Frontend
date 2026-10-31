// Public contract của dịch vụ DOCX để page không phụ thuộc đường dẫn nội bộ API.
export {
    documentTemplateApi,
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
} from './api/document-template.api';
export type {
    CreateUserDocumentRequest,
    DocumentTemplateCategory,
    DocumentTemplateDetail,
    DocumentTemplateListItem,
    DocumentTemplateListQuery,
    OnlyOfficeEditorConfig,
    OnlyOfficeEditorConfigResponse,
    PagedUserDocuments,
    PagedDocumentTemplates,
    SaveUserDocumentRequest,
    UserDocumentListQuery,
    UserDocumentSummary,
} from './types/document-template.types';
