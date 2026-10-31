// Tóm tắt bản PPTX riêng, cho phép mở editor web, tải file hoặc cập nhật bằng file đã sửa.
import { ArrowDownToLine, PencilLine } from 'lucide-react';
import { generatePath, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import powerpointIcon from '@/assets/icons/microsoft-365/powerpoint.svg';
import { PresentationUploadForm } from '@/pages/presentation-template-library/catalog/components/create-presentation/components/presentation-upload-form';
import type { CreatedPresentationPanelProps } from '@/pages/presentation-template-library/catalog/components/create-presentation/types/create-presentation.types';
import { getApiResourceUrl } from '@/shared/api/api-client';
import { ROUTE_PATHS } from '@/shared/config/route-paths';

// Chỉ bật chỉnh sửa/tải xuống khi backend đã đánh dấu bản sao sẵn sàng.
export function CreatedPresentationPanel({
    document,
    onClose,
    uploadForm,
}: CreatedPresentationPanelProps) {
    const downloadUrl = document.downloadUrl
        ? getApiResourceUrl(document.downloadUrl)
        : null;

    return (
        <section className="relative mt-5 space-y-4">
            <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-blue-100/80 bg-blue-50/55 p-3.5">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/90 bg-white shadow-sm">
                    <img
                        src={powerpointIcon}
                        alt=""
                        className="size-7 object-contain"
                    />
                </span>
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-(--ink)">
                        {document.title}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-(--muted-ink)">
                        <span className="rounded-full bg-white/90 px-2 py-0.5 font-semibold text-blue-700">
                            PPTX
                        </span>
                        <span>Mẫu v{document.sourceTemplate.version}</span>
                    </div>
                </div>
            </div>

            {document.status === 'ready' ? (
                <div className="grid gap-2.5 sm:grid-cols-[minmax(0,1fr)_auto]">
                    <Button
                        asChild
                        className="h-11 w-full rounded-[14px] bg-blue-600 text-white shadow-[0_10px_25px_rgba(33,118,229,0.2)] hover:bg-blue-700"
                    >
                        <Link
                            to={generatePath(ROUTE_PATHS.documentEditor, {
                                documentId: document.id,
                            })}
                            onClick={onClose}
                        >
                            <PencilLine aria-hidden="true" />
                            Chỉnh sửa trên web
                        </Link>
                    </Button>
                    {downloadUrl && (
                        <Button
                            asChild
                            variant="outline"
                            className="h-11 w-full rounded-[14px] border-blue-100 bg-white/80 text-blue-800 hover:bg-blue-50"
                        >
                            <a href={downloadUrl} download>
                                <ArrowDownToLine aria-hidden="true" />
                                Tải về sửa bằng PowerPoint
                            </a>
                        </Button>
                    )}
                </div>
            ) : (
                <p
                    className="rounded-[14px] border border-sky-100 bg-sky-50/80 px-3.5 py-3 text-sm text-sky-800"
                    role="status"
                >
                    Bản PPTX đang được chuẩn bị.
                </p>
            )}

            <PresentationUploadForm {...uploadForm} />
        </section>
    );
}
