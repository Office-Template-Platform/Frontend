// Public contract của dịch vụ PPTX; có thể mở rộng endpoint mà không đổi cấu trúc page.
export {
    presentationTemplateApi,
    useCreateUserPresentationMutation,
    useGetPresentationTemplateQuery,
    useListPresentationTemplatesQuery,
} from './api/presentation-template.api';
export type {
    CreateUserPresentationRequest,
    PresentationSlidePreviewSummary,
    PresentationTemplateDetail,
    PresentationTemplateSummary,
} from './types/presentation-template.types';
