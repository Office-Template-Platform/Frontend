// Hộp thoại xem ảnh trọn khung slide và thông tin chi tiết của bộ mẫu PPTX.
import { FilePlus, Layers3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import powerpointIcon from '@/assets/icons/microsoft-365/powerpoint.svg';
import { PresentationTemplateArtwork } from '@/pages/presentation-template-library/catalog/components/presentation-template-artwork';
import type { PresentationTemplateSummary } from '@/services/presentation-template';

type PresentationTemplatePreviewDialogProps = {
    template: PresentationTemplateSummary | null;
    onClose: () => void;
    onUse: (template: PresentationTemplateSummary) => void;
};

// Đồng bộ trạng thái mở với template đang chọn và đóng modal khi người dùng thoát.
export function PresentationTemplatePreviewDialog({
    template,
    onClose,
    onUse,
}: PresentationTemplatePreviewDialogProps) {
    return (
        <Dialog
            open={Boolean(template)}
            onOpenChange={(isOpen) => {
                if (!isOpen) onClose();
            }}
        >
            {template && (
                <DialogContent className="max-h-[calc(100dvh-2rem)] max-w-6xl overflow-y-auto rounded-[28px] border border-white/90 bg-white/95 p-0 md:h-[min(82dvh,780px)] md:overflow-hidden">
                    <div className="grid grid-cols-1 items-stretch md:h-full md:min-h-0 md:grid-cols-[minmax(0,1.2fr)_minmax(270px,0.8fr)]">
                        <div className="flex h-[min(44dvh,360px)] min-h-[220px] items-center justify-center rounded-t-[27px] bg-gradient-to-br from-blue-100/80 via-sky-50 to-white/85 p-4 sm:p-6 md:h-full md:min-h-0 md:rounded-tl-[27px] md:rounded-tr-none">
                            <PresentationTemplateArtwork
                                template={template}
                                displayMode="dialog"
                            />
                        </div>
                        <section className="flex flex-col justify-center p-5 sm:p-7 md:min-h-0">
                            <span className="mb-4 w-fit rounded-full border border-blue-100 bg-blue-50/80 px-2.5 py-1 text-[11px] font-semibold text-blue-700">
                                {template.category}
                            </span>
                            <DialogHeader className="gap-0 p-0">
                                <DialogTitle className="pr-6 text-xl font-semibold tracking-[-0.035em] sm:text-2xl">
                                    {template.name}
                                </DialogTitle>
                                <DialogDescription className="mt-2 text-[13px] leading-6">
                                    {template.description ||
                                        'Bộ mẫu trình chiếu PowerPoint sẵn sàng để bạn khám phá.'}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="mt-5 flex items-center gap-3 rounded-[15px] border border-blue-100/80 bg-blue-50/45 p-3.5">
                                <span className="grid size-10 place-items-center rounded-xl border border-white bg-white text-blue-700 shadow-sm">
                                    <Layers3
                                        className="size-4.5"
                                        aria-hidden="true"
                                    />
                                </span>
                                <span className="grid gap-0.5">
                                    <strong className="text-sm font-semibold text-(--ink)">
                                        {template.slideCount} slide
                                    </strong>
                                    <span className="text-[11px] text-(--muted-ink)">
                                        Số trang trong bộ mẫu
                                    </span>
                                </span>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-[11px] leading-5 text-(--muted-ink)">
                                <img
                                    className="size-5 object-contain"
                                    src={powerpointIcon}
                                    alt=""
                                />
                                <span>
                                    Mẫu định dạng PPTX dành cho Microsoft
                                    PowerPoint.
                                </span>
                            </div>
                            <div className="mt-auto pt-5">
                                <Button
                                    type="button"
                                    onClick={() => onUse(template)}
                                    className="h-12 w-full rounded-[15px] bg-blue-600 text-white shadow-[0_12px_28px_rgba(33,118,229,0.22)] transition-[background-color,box-shadow,transform] hover:bg-blue-700 hover:shadow-[0_16px_32px_rgba(33,118,229,0.28)]"
                                >
                                    <FilePlus aria-hidden="true" />
                                    Dùng mẫu này
                                </Button>
                            </div>
                        </section>
                    </div>
                </DialogContent>
            )}
        </Dialog>
    );
}
