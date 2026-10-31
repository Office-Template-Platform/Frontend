// Public contract của dịch vụ PPTX; có thể mở rộng endpoint mà không đổi cấu trúc page.
export {
    presentationTemplateApi,
    useCreateUserPresentationMutation,
    useListPresentationTemplatesQuery,
} from './api/presentation-template.api';
export type {
    CreateUserPresentationRequest,
    PresentationTemplateSummary,
} from './types/presentation-template.types';
