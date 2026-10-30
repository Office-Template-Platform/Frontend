// Thẻ PPTX hiển thị preview, phân loại và số slide do backend cung cấp.
import { Presentation } from 'lucide-react';
import { getApiResourceUrl } from '@/shared/api/api-client';
import type { PresentationTemplateCardProps } from '@/pages/presentation-template-library/catalog/types/presentation-template-ui.types';

// Giữ thumbnail theo tỷ lệ slide và không giả lập thao tác tạo chưa có endpoint.
export function PresentationTemplateCard({
    template,
}: PresentationTemplateCardProps) {
    const previewUrl = template.previewUrl
        ? getApiResourceUrl(template.previewUrl)
        : null;

    return (
        <article className="glass-panel flex min-w-0 flex-col rounded-[25px] p-3.5 sm:p-4">
            <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-[19px] border border-white/90 bg-gradient-to-br from-sky-100/85 via-blue-50 to-white/75">
                {previewUrl ? (
                    <img
                        src={previewUrl}
                        alt={`Ảnh xem trước bộ mẫu ${template.name}`}
                        loading="lazy"
                        decoding="async"
                        className="size-full object-cover"
                    />
                ) : (
                    <Presentation
                        className="size-10 text-sky-600/70"
                        aria-hidden="true"
                    />
                )}
                <span className="absolute top-3 left-3 rounded-full border border-white/90 bg-white/85 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-sky-800 shadow-sm">
                    PPTX
                </span>
            </div>
            <div className="px-1 pt-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="rounded-full border border-sky-100 bg-sky-50/80 px-2.5 py-1 text-[11px] font-semibold text-sky-800">
                        {template.category}
                    </span>
                    <span className="text-[11px] font-medium tabular-nums text-(--muted-ink)">
                        {template.slideCount} slide
                    </span>
                </div>
                <h2 className="text-base font-semibold tracking-[-0.025em] text-(--ink)">
                    {template.name}
                </h2>
                <p className="mt-1.5 line-clamp-2 text-[13px] leading-5.5 text-(--muted-ink)">
                    {template.description}
                </p>
            </div>
        </article>
    );
}
