// Card PPTX giữ bố cục DOCX, dùng khung 4:3 và đặt ảnh slide theo kiểu contain.
import {
    ArrowUpRight,
    FileText,
    Layers3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PresentationTemplateArtwork } from '@/pages/presentation-template-library/catalog/components/presentation-template-artwork';
import type { PresentationTemplateCardProps } from '@/pages/presentation-template-library/catalog/types/presentation-template-ui.types';

// Hiển thị rõ đặc trưng của từng bộ slide và mở preview khi người dùng chọn.
export function PresentationTemplateCard({
    template,
    onUse,
    onPreview,
}: PresentationTemplateCardProps) {
    return (
        <article className="glass-panel group flex min-w-0 flex-col rounded-[25px] p-3.5 transition-[box-shadow,border-color] duration-300 hover:border-blue-200/90 hover:shadow-[0_26px_68px_rgba(37,99,235,0.14)] sm:p-4">
            <Button
                type="button"
                variant="ghost"
                className="group/preview relative flex aspect-[4/3] h-auto min-h-64 w-full items-center justify-center overflow-hidden rounded-[19px] border border-white/90 bg-gradient-to-br from-blue-100/80 via-sky-50 to-white/70 p-0 text-left whitespace-normal hover:bg-gradient-to-br hover:from-blue-100/80 hover:via-sky-50 hover:to-white/70 active:translate-y-0 focus-visible:ring-3 focus-visible:ring-blue-400/50"
                onClick={() => onPreview(template)}
                aria-label={`Xem trước bộ mẫu ${template.name}`}
            >
                <PresentationTemplateArtwork template={template} />
                <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/90 bg-white/85 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-blue-700 shadow-sm backdrop-blur">
                    PPTX
                </span>
                <span className="absolute right-3 bottom-3 z-20 inline-flex size-9 items-center justify-center rounded-full border border-white/90 bg-white/85 text-blue-700 shadow-sm backdrop-blur transition-colors group-hover/preview:bg-white">
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                </span>
            </Button>

            <div className="flex flex-1 flex-col px-1 pt-4">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-blue-100 bg-blue-50/80 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
                        {template.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/65 px-2.5 py-1 text-[11px] font-medium tabular-nums text-(--muted-ink)">
                        <Layers3 className="size-3.5" aria-hidden="true" />
                        {template.slideCount} slide
                    </span>
                </div>
                <h2 className="line-clamp-2 text-base font-semibold tracking-[-0.025em] text-(--ink) sm:text-[17px]">
                    {template.name}
                </h2>
                <p className="mt-1.5 line-clamp-2 min-h-10 text-[13px] leading-5.5 text-(--muted-ink)">
                    {template.description ||
                        'Mẫu trình chiếu sẵn sàng để bạn khám phá.'}
                </p>

                <div className="mt-auto flex items-center gap-2.5 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onPreview(template)}
                        className="h-10 flex-1 rounded-[13px] border-blue-100 bg-white/70 text-blue-800 hover:border-blue-200 hover:bg-white"
                    >
                        <FileText aria-hidden="true" />
                        Xem trước
                    </Button>
                    <Button
                        type="button"
                        onClick={() => onUse(template)}
                        className="h-10 flex-1 rounded-[13px] bg-blue-600 text-white shadow-[0_8px_20px_rgba(33,118,229,0.2)] hover:bg-blue-700"
                    >
                        Dùng mẫu
                    </Button>
                </div>
            </div>
        </article>
    );
}
