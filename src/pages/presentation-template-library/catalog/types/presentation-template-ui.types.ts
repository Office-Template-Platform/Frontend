// Props của card catalog PPTX được tách khỏi implementation.
import type { PresentationTemplateSummary } from '@/services/presentation-template';

export type PresentationTemplateCardProps = {
    template: PresentationTemplateSummary;
};
