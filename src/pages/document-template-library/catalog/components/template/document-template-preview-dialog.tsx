// Dialog preview tải metadata chi tiết và ảnh từ API mà không rời catalog.
import { FilePlus, FileText, ImageOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { getApiResourceUrl } from '@/shared/api/api-client';
import { getApiErrorMessage } from '@/shared/api/get-api-error-message';
import { useGetDocumentTemplateQuery } from '@/services/document-template';
import type { DocumentTemplateDialogProps } from '@/pages/document-template-library/catalog/types/document-template-ui.types';

// Giữ card metadata dùng được nếu detail API lỗi, đồng thời chỉ truy vấn khi có mẫu chọn.
export function DocumentTemplatePreviewDialog({
    template,
    onClose,
    onUse,
}: DocumentTemplateDialogProps) {
    const { currentData, isFetching, isError, error } =
        useGetDocumentTemplateQuery(template?.id ?? '', { skip: !template });
    const detail = currentData ?? template;
    const previewPath = detail?.previewUrl;
    const previewUrl = previewPath ? getApiResourceUrl(previewPath) : null;

    return (
        <Dialog
            open={Boolean(template)}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
        >
            {detail && (
                <DialogContent className="gap-5 rounded-[26px] border-white/90 bg-white/92 p-4 shadow-[0_36px_100px_rgba(34,74,123,0.24)] sm:max-w-[1000px] sm:rounded-[30px] sm:p-6">
                    <DialogHeader className="pr-12 sm:pr-14">
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50/90 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-blue-700">
                                <FileText
                                    className="size-3"
                                    aria-hidden="true"
                                />
                                DOCX
                            </span>
                            <span className="rounded-full border border-slate-200/80 bg-white/70 px-2.5 py-1 text-[11px] font-medium text-(--muted-ink)">
                                {detail.category.name}
                            </span>
                        </div>
                        <DialogTitle className="text-xl sm:text-2xl">
                            {detail.name}
                        </DialogTitle>
                        <DialogDescription className="mt-1">
                            Xem bố cục mẫu trước khi tạo một tài liệu DOCX
                            riêng.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid min-h-0 gap-4 md:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
                        <section
                            aria-label="Bản xem trước mẫu"
                            className="relative flex min-h-72 items-center justify-center overflow-hidden rounded-[22px] border border-white/90 bg-gradient-to-br from-blue-100/90 via-sky-50 to-white/90 p-4 sm:min-h-96 sm:p-5"
                        >
                            <div
                                className="absolute -right-10 -bottom-16 size-56 rounded-full bg-white/75 blur-3xl"
                                aria-hidden="true"
                            />
                            <span className="absolute top-3 left-3 z-20 rounded-full border border-white/90 bg-white/75 px-2.5 py-1 text-[10px] font-semibold tracking-[0.08em] text-blue-700 shadow-sm backdrop-blur">
                                XEM TRƯỚC
                            </span>
                            {isFetching && !currentData ? (
                                <Skeleton className="relative z-10 h-full min-h-64 w-2/3 rounded-xl bg-white/80" />
                            ) : previewUrl ? (
                                <img
                                    src={previewUrl}
                                    alt={`Bản xem trước đầy đủ của ${detail.name}`}
                                    className="relative z-10 max-h-[56vh] max-w-full rounded-xl border border-white/90 bg-white p-1.5 object-contain shadow-[0_22px_52px_rgba(33,75,126,0.22)]"
                                />
                            ) : (
                                <div className="relative z-10 flex flex-col items-center gap-3 text-blue-600">
                                    <span className="flex size-16 items-center justify-center rounded-[21px] border border-white/90 bg-white/75 shadow-[0_14px_36px_rgba(33,75,126,0.14)]">
                                        <ImageOff
                                            className="size-7"
                                            aria-hidden="true"
                                        />
                                    </span>
                                    <span className="text-xs font-medium text-(--muted-ink)">
                                        Mẫu chưa có ảnh xem trước
                                    </span>
                                </div>
                            )}
                        </section>

                        <section className="flex min-w-0 flex-col rounded-[22px] border border-white/90 bg-white/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:p-5">
                            <div className="flex items-center gap-3">
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-[13px] border border-white bg-blue-50/90 text-blue-600 shadow-sm">
                                    <FileText
                                        className="size-4"
                                        aria-hidden="true"
                                    />
                                </span>
                                <h3 className="text-sm font-semibold text-(--ink)">
                                    Thông tin mẫu
                                </h3>
                            </div>
                            <p className="mt-4 text-sm leading-6 text-(--muted-ink)">
                                {detail.description ??
                                    'Mẫu DOCX có thể dùng để tạo tài liệu mới.'}
                            </p>
                            <dl className="mt-4 grid grid-cols-2 gap-2.5 text-xs">
                                <div className="min-w-0 rounded-[15px] border border-white/90 bg-white/65 p-3">
                                    <dt className="text-(--muted-ink)">
                                        Danh mục
                                    </dt>
                                    <dd className="mt-1 truncate font-semibold text-(--ink)">
                                        {detail.category.name}
                                    </dd>
                                </div>
                                <div className="rounded-[15px] border border-white/90 bg-white/65 p-3">
                                    <dt className="text-(--muted-ink)">
                                        Phiên bản
                                    </dt>
                                    <dd className="mt-1 font-semibold text-(--ink)">
                                        v{detail.currentVersion}
                                    </dd>
                                </div>
                            </dl>
                            {isError && (
                                <p
                                    className="mt-3 rounded-[14px] border border-amber-100 bg-amber-50/75 p-3 text-xs leading-5 text-amber-700"
                                    role="status"
                                >
                                    Chi tiết chưa tải được:{' '}
                                    {getApiErrorMessage(error)}
                                </p>
                            )}
                            <div className="mt-auto pt-5">
                                <Button
                                    type="button"
                                    onClick={() => onUse(template ?? detail)}
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
