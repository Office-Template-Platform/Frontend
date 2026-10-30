// Public contract của dịch vụ DOCX để page không phụ thuộc đường dẫn nội bộ API.
export {
    documentTemplateApi,
    useCreateUserDocumentMutation,
    useGetDocumentTemplateQuery,
    useListDocumentTemplateCategoriesQuery,
    useListDocumentTemplatesQuery,
    useSaveUserDocumentMutation,
} from './api/document-template.api';
export type {
    CreateUserDocumentRequest,
    DocumentTemplateCategory,
    DocumentTemplateDetail,
    DocumentTemplateListItem,
    DocumentTemplateListQuery,
    PagedDocumentTemplates,
    SaveUserDocumentRequest,
    UserDocumentSummary,
} from './types/document-template.types';
