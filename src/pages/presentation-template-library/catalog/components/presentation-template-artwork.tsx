// Hình xem trước dùng chung cho card và hộp thoại; contain giữ nguyên toàn bộ khung slide.
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { getApiResourceUrl } from '@/shared/api/api-client';
import type { PresentationTemplateSummary } from '@/services/presentation-template';

type PresentationTemplateArtworkProps = {
    template: PresentationTemplateSummary;
    displayMode?: 'card' | 'dialog';
};

// Giữ vùng ảnh ổn định trong lúc tải và chuyển sang bìa minh họa nếu URL không tồn tại hoặc bị lỗi.
export function PresentationTemplateArtwork({
    template,
    displayMode = 'card',
}: PresentationTemplateArtworkProps) {
    const [loadedPreviewUrl, setLoadedPreviewUrl] = useState<string | null>(
        null,
    );
    const [failedPreviewUrl, setFailedPreviewUrl] = useState<string | null>(
        null,
    );
    const previewUrl = template.previewUrl
        ? getApiResourceUrl(template.previewUrl)
        : null;
    const isPreviewLoaded = Boolean(
        previewUrl && loadedPreviewUrl === previewUrl,
    );
    const isPreviewFailed = Boolean(
        previewUrl && failedPreviewUrl === previewUrl,
    );
    const isDialogPreview = displayMode === 'dialog';

    return (
        <div
            className={`relative ${isDialogPreview ? 'flex h-full w-full items-center justify-center' : 'grid size-full place-items-center overflow-hidden'} bg-gradient-to-br from-blue-100/80 via-sky-50 to-white/80`}
        >
            <div
                className="absolute -right-8 -bottom-14 size-40 rounded-full bg-white/55 blur-2xl"
                aria-hidden="true"
            />
            {previewUrl && !isPreviewFailed ? (
                <>
                    {!isPreviewLoaded && (
                        <div
                            className={`pointer-events-none absolute z-10 flex flex-col rounded-[14px] border border-white/95 bg-white/90 p-4 shadow-[0_15px_32px_rgba(33,75,126,0.14)] ${isDialogPreview ? 'inset-[8%]' : 'aspect-video w-[88%]'}`}
                            aria-hidden="true"
                        >
                            <Skeleton className="h-2 w-1/3 bg-blue-100/90" />
                            <Skeleton className="mt-3 h-4 w-2/3 bg-slate-100" />
                            <Skeleton className="mt-2 h-2 w-4/5 bg-slate-100" />
                            <Skeleton className="mt-1.5 h-2 w-3/5 bg-slate-100" />
                            <Skeleton className="mt-auto h-8 w-2/5 rounded-lg bg-blue-50" />
                        </div>
                    )}
                    <img
                        src={previewUrl}
                        alt={`Ảnh xem trước bộ mẫu ${template.name}`}
                        loading={isDialogPreview ? 'eager' : 'lazy'}
                        decoding="async"
                        onLoad={() => setLoadedPreviewUrl(previewUrl)}
                        onError={() => setFailedPreviewUrl(previewUrl)}
                        className={`relative z-[5] block object-contain transition-opacity duration-300 ${isDialogPreview ? 'h-auto w-auto max-h-full max-w-full' : 'h-full w-full max-w-full p-2.5'} ${isPreviewLoaded ? 'opacity-100' : 'opacity-0'}`}
                    />
                </>
            ) : (
                <div
                    className={`relative z-[5] flex flex-col justify-between overflow-hidden rounded-[14px] border border-white/95 bg-gradient-to-br from-white to-blue-50 p-5 shadow-[0_15px_32px_rgba(33,75,126,0.14)] ${isDialogPreview ? 'aspect-video h-auto w-[82%] max-h-full max-w-[520px]' : 'aspect-video w-[82%] max-w-[520px]'}`}
                    aria-hidden="true"
                >
                    <span className="h-1 w-8 rounded-full bg-blue-500" />
                    <span className="max-w-[70%] text-base font-semibold tracking-tight text-slate-700 sm:text-lg">
                        {template.name}
                    </span>
                    <span className="grid w-2/5 gap-1.5">
                        <span className="h-1 rounded-full bg-blue-100" />
                        <span className="h-1 w-2/3 rounded-full bg-blue-100" />
                    </span>
                </div>
            )}
        </div>
    );
}
