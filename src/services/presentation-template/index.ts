// Public contract của dịch vụ PPTX; có thể mở rộng endpoint mà không đổi cấu trúc page.
export {
    presentationTemplateApi,
    useListPresentationTemplatesQuery,
} from './api/presentation-template.api';
export type { PresentationTemplateSummary } from './types/presentation-template.types';
