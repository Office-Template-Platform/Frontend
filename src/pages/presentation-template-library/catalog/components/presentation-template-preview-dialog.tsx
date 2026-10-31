// Hộp thoại xem nhiều slide và giữ nút trước/sau cố định khi nhấn điều hướng.
import { useEffect, useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    FilePlus,
    ImageOff,
    Layers3,
    LoaderCircle,
    RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import powerpointIcon from '@/assets/icons/microsoft-365/powerpoint.svg';
import { PresentationTemplateArtwork } from '@/pages/presentation-template-library/catalog/components/presentation-template-artwork';
import { useGetPresentationTemplateQuery } from '@/services/presentation-template';
import type {
    PresentationSlidePreviewSummary,
    PresentationTemplateSummary,
} from '@/services/presentation-template';
import { getApiResourceUrl } from '@/shared/api/api-client';

type PresentationTemplatePreviewDialogProps = {
    template: PresentationTemplateSummary | null;
    onClose: () => void;
    onUse: (template: PresentationTemplateSummary) => void;
};

type PresentationSlidePreviewImageProps = {
    slide: PresentationSlidePreviewSummary;
    loading: 'eager' | 'lazy';
    className: string;
};

// Hiển thị ảnh của một slide và cung cấp trạng thái thay thế nếu preview không tải được.
function PresentationSlidePreviewImage({
    slide,
    loading,
    className,
}: PresentationSlidePreviewImageProps) {
    const [hasFailed, setHasFailed] = useState(false);
    const imageUrl = getApiResourceUrl(slide.previewUrl);
    const slideLabel = slide.title?.trim()
        ? `Slide ${slide.slideNumber}: ${slide.title}`
        : `Slide ${slide.slideNumber}`;

    if (hasFailed) {
        return (
            <div
                className={`${className} grid place-items-center bg-slate-50 text-slate-400`}
                role="img"
                aria-label={`Không tải được ảnh ${slideLabel}`}
            >
                <span className="flex flex-col items-center gap-1.5">
                    <ImageOff className="size-5" aria-hidden="true" />
                    <span className="text-[10px] font-medium">
                        Chưa có ảnh xem trước
                    </span>
                </span>
            </div>
        );
    }

    return (
        <img
            src={imageUrl}
            alt={slideLabel}
            loading={loading}
            decoding="async"
            onError={() => setHasFailed(true)}
            className={`${className} object-contain`}
        />
    );
}

// Tạo nút thumbnail có thể chọn, giữ số slide và tiêu đề dễ đọc khi lướt danh sách.
function PresentationSlideThumbnail({
    slide,
    isSelected,
    onSelect,
}: {
    slide: PresentationSlidePreviewSummary;
    isSelected: boolean;
    onSelect: () => void;
}) {
    const slideTitle = slide.title?.trim() || `Slide ${slide.slideNumber}`;

    return (
        <button
            type="button"
            onClick={onSelect}
            aria-label={`Xem slide ${slide.slideNumber}: ${slideTitle}`}
            aria-pressed={isSelected}
            className={`group w-[118px] shrink-0 snap-start cursor-pointer rounded-[14px] border p-1.5 text-left transition-[border-color,background-color,box-shadow] duration-200 sm:w-[136px] ${
                isSelected
                    ? 'border-blue-400 bg-blue-50/90 shadow-[0_0_0_2px_rgb(59_130_246/14%),0_8px_18px_rgb(33_118_229/10%)]'
                    : 'border-white/90 bg-white/65 hover:border-blue-200 hover:bg-white'
            }`}
        >
            <span className="relative block aspect-video overflow-hidden rounded-[9px] bg-gradient-to-br from-blue-50 to-white">
                <Skeleton className="absolute inset-1 rounded-md bg-blue-100/60" />
                <PresentationSlidePreviewImage
                    key={slide.previewUrl}
                    slide={slide}
                    loading="lazy"
                    className="relative z-1 size-full p-0.5"
                />
            </span>
            <span className="mt-1.5 block truncate px-0.5 text-[10px] font-medium text-slate-600 group-aria-pressed:text-blue-700">
                {slideTitle}
            </span>
        </button>
    );
}

// Đồng bộ slide đang chọn theo mẫu; chỉ tải detail khi hộp thoại được mở.
export function PresentationTemplatePreviewDialog({
    template,
    onClose,
    onUse,
}: PresentationTemplatePreviewDialogProps) {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const {
        currentData: templateDetail,
        isError: isDetailError,
        isFetching: isDetailFetching,
        refetch: refetchTemplateDetail,
    } = useGetPresentationTemplateQuery(template?.id ?? '', {
        skip: !template,
        refetchOnMountOrArgChange: true,
    });
    const slides = templateDetail?.slides ?? [];
    const activeSlide = slides[activeSlideIndex] ?? null;

    useEffect(() => {
        // Mỗi lần mở bộ mẫu khác phải bắt đầu từ slide đầu tiên, không giữ lựa chọn cũ.
        setActiveSlideIndex(0);
    }, [template?.id]);

    // Giới hạn điều hướng trong số slide backend trả về, không tự tạo số thứ tự thiếu.
    function handleMoveSlide(direction: -1 | 1): void {
        setActiveSlideIndex((currentIndex) =>
            Math.min(
                Math.max(currentIndex + direction, 0),
                Math.max(slides.length - 1, 0),
            ),
        );
    }

    return (
        <Dialog
            open={Boolean(template)}
            onOpenChange={(isOpen) => {
                if (!isOpen) onClose();
            }}
        >
            {template && (
                <DialogContent className="max-h-[calc(100dvh-1.5rem)] max-w-7xl overflow-y-auto rounded-[28px] border border-white/90 bg-white/96 p-0 shadow-[0_34px_100px_rgb(25_49_82/24%)] md:h-[min(88dvh,840px)] md:overflow-hidden">
                    <div className="grid grid-cols-1 md:h-full md:min-h-0 md:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.85fr)]">
                        <section className="flex min-h-[540px] min-w-0 flex-col gap-3.5 rounded-t-[27px] bg-gradient-to-br from-blue-50 via-sky-50/80 to-white p-4 sm:p-5 md:min-h-0 md:rounded-tl-[27px] md:rounded-tr-none">
                            <div className="flex shrink-0 items-center justify-between gap-3 px-1">
                                <div className="min-w-0">
                                    <p className="text-[10px] font-bold tracking-[0.14em] text-blue-700 uppercase">
                                        Xem trước bộ slide
                                    </p>
                                    <p className="mt-0.5 text-[11px] text-slate-500">
                                        Chọn một trang để xem rõ hơn
                                    </p>
                                </div>
                                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/90 bg-white/75 px-2.5 py-1.5 text-[11px] font-semibold tabular-nums text-slate-600 shadow-sm">
                                    <Layers3
                                        className="size-3.5 text-blue-600"
                                        aria-hidden="true"
                                    />
                                    {templateDetail?.slides.length ??
                                        template.slideCount}{' '}
                                    slide
                                </span>
                            </div>

                            <div className="relative flex min-h-[240px] flex-1 items-center justify-center overflow-hidden rounded-[22px] border border-white/95 bg-white/65 p-2.5 shadow-[0_16px_40px_rgb(53_99_153/9%),inset_0_1px_0_rgb(255_255_255/95%)] sm:p-3.5">
                                <div className="relative flex h-full max-h-[min(58dvh,560px)] min-h-[220px] w-full items-center justify-center overflow-hidden rounded-[15px] border border-slate-200/70 bg-white shadow-sm">
                                    {activeSlide ? (
                                        <>
                                            <Skeleton className="absolute inset-2 rounded-lg bg-blue-50" />
                                            <PresentationSlidePreviewImage
                                                key={activeSlide.previewUrl}
                                                slide={activeSlide}
                                                loading="eager"
                                                className="relative z-1 size-full p-1.5 sm:p-2.5"
                                            />
                                        </>
                                    ) : (
                                        <PresentationTemplateArtwork
                                            template={template}
                                            displayMode="dialog"
                                        />
                                    )}
                                </div>

                                {activeSlide && slides.length > 1 && (
                                    <>
                                        <Button
                                            type="button"
                                            size="icon"
                                            variant="outline"
                                            aria-label="Xem slide trước"
                                            disabled={activeSlideIndex === 0}
                                            onClick={() => handleMoveSlide(-1)}
                                            className="pointer-events-auto absolute top-1/2 left-3 z-20 size-9 -translate-y-1/2 cursor-pointer rounded-full border-white/90 bg-white/90 text-slate-700 shadow-lg hover:border-blue-600 hover:bg-blue-600 hover:text-white active:not-aria-[haspopup]:-translate-y-1/2 disabled:cursor-not-allowed disabled:opacity-40 sm:left-4"
                                        >
                                            <ChevronLeft aria-hidden="true" />
                                        </Button>
                                        <Button
                                            type="button"
                                            size="icon"
                                            variant="outline"
                                            aria-label="Xem slide tiếp theo"
                                            disabled={
                                                activeSlideIndex ===
                                                slides.length - 1
                                            }
                                            onClick={() => handleMoveSlide(1)}
                                            className="pointer-events-auto absolute top-1/2 right-3 z-20 size-9 -translate-y-1/2 cursor-pointer rounded-full border-white/90 bg-white/90 text-slate-700 shadow-lg hover:border-blue-600 hover:bg-blue-600 hover:text-white active:not-aria-[haspopup]:-translate-y-1/2 disabled:cursor-not-allowed disabled:opacity-40 sm:right-4"
                                        >
                                            <ChevronRight aria-hidden="true" />
                                        </Button>
                                        <span className="absolute right-3 bottom-3 rounded-full border border-white/90 bg-white/90 px-2.5 py-1 text-[10px] font-semibold tabular-nums text-slate-700 shadow-sm sm:right-4 sm:bottom-4">
                                            Slide {activeSlide.slideNumber} /{' '}
                                            {slides.length}
                                        </span>
                                    </>
                                )}

                                {isDetailFetching && !templateDetail && (
                                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/90 bg-white/90 px-2.5 py-1.5 text-[10px] font-medium text-blue-700 shadow-sm">
                                        <LoaderCircle
                                            className="size-3.5 animate-spin motion-reduce:animate-none"
                                            aria-hidden="true"
                                        />
                                        Đang tải danh sách slide
                                    </span>
                                )}
                            </div>

                            <div className="shrink-0 rounded-[17px] border border-white/90 bg-white/55 p-2.5 sm:p-3">
                                <div className="mb-2 flex items-center justify-between gap-3 px-0.5">
                                    <p className="text-xs font-semibold text-slate-700">
                                        Các slide trong bộ mẫu
                                    </p>
                                    {activeSlide && (
                                        <p
                                            className="text-[10px] tabular-nums text-slate-500"
                                            aria-live="polite"
                                        >
                                            Đang xem slide{' '}
                                            {activeSlide.slideNumber} trên{' '}
                                            {slides.length}
                                        </p>
                                    )}
                                </div>

                                {isDetailError && !templateDetail ? (
                                    <div
                                        className="flex min-h-20 items-center justify-between gap-3 rounded-[12px] border border-amber-100 bg-amber-50/75 px-3 py-2.5"
                                        role="alert"
                                    >
                                        <p className="text-[11px] leading-5 text-amber-800">
                                            Không tải được danh sách slide.
                                        </p>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                                void refetchTemplateDetail()
                                            }
                                            className="h-8 shrink-0 rounded-[10px] border-amber-200 bg-white px-2.5 text-[10px] text-amber-800 hover:bg-amber-50"
                                        >
                                            <RefreshCw aria-hidden="true" />
                                            Thử lại
                                        </Button>
                                    </div>
                                ) : isDetailFetching && !templateDetail ? (
                                    <div className="flex snap-x gap-2 overflow-hidden">
                                        {Array.from(
                                            { length: 5 },
                                            (_, index) => (
                                                <Skeleton
                                                    key={index}
                                                    className="aspect-video w-[118px] shrink-0 rounded-[12px] bg-blue-100/70 sm:w-[136px]"
                                                />
                                            ),
                                        )}
                                    </div>
                                ) : slides.length > 0 ? (
                                    <div
                                        className="presentation-slide-filmstrip flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1.5"
                                        aria-label="Danh sách slide xem trước"
                                    >
                                        {slides.map((slide, index) => (
                                            <PresentationSlideThumbnail
                                                key={`${template.id}-${slide.slideNumber}`}
                                                slide={slide}
                                                isSelected={
                                                    activeSlideIndex === index
                                                }
                                                onSelect={() =>
                                                    setActiveSlideIndex(index)
                                                }
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex min-h-20 items-center justify-center rounded-[12px] border border-dashed border-blue-100 bg-white/65 px-4 text-center text-[11px] leading-5 text-slate-500">
                                        Bộ mẫu chưa có ảnh xem trước từng slide.
                                        Bạn vẫn có thể xem ảnh bìa ở trên.
                                    </div>
                                )}
                            </div>
                        </section>

                        <section className="flex flex-col p-5 sm:p-7 md:min-h-0 md:overflow-y-auto md:pt-10">
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
                                        Chọn ảnh thu nhỏ để xem từng trang
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
