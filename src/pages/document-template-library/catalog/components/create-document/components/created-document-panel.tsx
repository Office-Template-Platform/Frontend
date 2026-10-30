// Tóm tắt bản sao đã tạo và cho phép tiếp tục bằng editor web, Word hoặc tải bản DOCX mới lên.
import {
    ArrowDownToLine,
    FileText,
    LoaderCircle,
    PencilLine,
} from 'lucide-react';
import { generatePath, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getApiResourceUrl } from '@/shared/api/api-client';
import { ROUTE_PATHS } from '@/shared/config/route-paths';
import { EditedDocumentUploadForm } from '@/pages/document-template-library/catalog/components/create-document/components/edited-document-upload-form';
import type { CreatedDocumentPanelProps } from '@/pages/document-template-library/catalog/components/create-document/types/create-document.types';

// Chỉ hiện các hành động phù hợp với metadata hiện tại; link editor đóng dialog trước khi chuyển trang.
export function CreatedDocumentPanel({
    document,
    onClose,
    uploadForm,
}: CreatedDocumentPanelProps) {
    const downloadUrl = document.downloadUrl
        ? getApiResourceUrl(document.downloadUrl)
        : null;

    return (
        <section className="relative mt-5 space-y-4">
            <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-blue-100/80 bg-blue-50/55 p-3.5">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/90 bg-white text-blue-700 shadow-sm">
                    <FileText className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-(--ink)">
                        {document.title}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-(--muted-ink)">
                        <span className="rounded-full bg-white/90 px-2 py-0.5 font-semibold text-blue-700">
                            DOCX
                        </span>
                        <span>Mẫu v{document.sourceTemplate.version}</span>
                    </div>
                </div>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-[minmax(0,1fr)_auto]">
                {document.status === 'ready' && (
                    <Button
                        asChild
                        className={`h-11 w-full rounded-[14px] bg-blue-600 text-white shadow-[0_10px_25px_rgba(33,118,229,0.2)] hover:bg-blue-700 ${!downloadUrl ? 'sm:col-span-2' : ''}`}
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
                )}

                {downloadUrl ? (
                    <Button
                        asChild
                        variant="outline"
                        className={`h-11 w-full rounded-[14px] border-blue-100 bg-white/80 text-blue-800 hover:bg-blue-50 ${document.status !== 'ready' ? 'sm:col-span-2' : ''}`}
                    >
                        <a href={downloadUrl} download>
                            <ArrowDownToLine aria-hidden="true" />
                            Tải về sửa bằng Word
                        </a>
                    </Button>
                ) : (
                    <p
                        className="flex items-center gap-2 rounded-[14px] border border-amber-100 bg-amber-50/75 px-3.5 py-2.5 text-xs leading-5 text-amber-800 sm:col-span-2"
                        role="status"
                    >
                        <LoaderCircle
                            className="size-4 shrink-0 animate-spin motion-reduce:animate-none"
                            aria-hidden="true"
                        />
                        File DOCX đang được chuẩn bị.
                    </p>
                )}
            </div>

            <EditedDocumentUploadForm {...uploadForm} />
        </section>
    );
}
