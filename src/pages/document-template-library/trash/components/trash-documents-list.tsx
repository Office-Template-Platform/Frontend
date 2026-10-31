// Danh sách tài liệu đã xóa; mỗi mục hiển thị nguồn, định dạng và thao tác khôi phục.
import { Clock3, FileText, LoaderCircle, RotateCcw } from 'lucide-react';
import type { UserDocumentSummary } from '@/services/document-template';
import { Button } from '@/components/ui/button';
import wordIcon from '@/assets/icons/microsoft-365/word.svg';
import powerpointIcon from '@/assets/icons/microsoft-365/powerpoint.svg';

type TrashDocumentsListProps = {
    documents: UserDocumentSummary[];
    restoringDocumentId: string | null;
    isRestoring: boolean;
    onRestore: (document: UserDocumentSummary) => void;
};

const updatedAtFormatter = new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
});

// Định dạng thời điểm cập nhật cuối để người dùng nhận ra đúng bản tài liệu.
function formatUpdatedAt(value: string): string {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return 'Thời gian chưa xác định';
    }

    return updatedAtFormatter.format(date);
}

// Hiển thị một mục trong thùng rác và khóa thao tác khi request khôi phục đang chạy.
function TrashDocumentRow({
    document,
    restoringDocumentId,
    isRestoring,
    onRestore,
}: {
    document: UserDocumentSummary;
    restoringDocumentId: string | null;
    isRestoring: boolean;
    onRestore: (document: UserDocumentSummary) => void;
}) {
    const isPresentation = document.fileType === 'pptx';
    const documentIcon = isPresentation
        ? powerpointIcon
        : document.fileType === 'docx'
          ? wordIcon
          : null;
    const isRestoringThisDocument = restoringDocumentId === document.id;

    return (
        <li className="border-b border-blue-100/65 last:border-0">
            <article className="flex flex-col gap-3.5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:py-4.5">
                <div className="flex min-w-0 items-start gap-3.5 sm:items-center">
                    <span className="grid size-11 shrink-0 place-items-center rounded-[15px] border border-white/90 bg-blue-50/80 shadow-[inset_0_1px_0_rgb(255_255_255/95%)]">
                        {documentIcon ? (
                            <img
                                src={documentIcon}
                                alt=""
                                width="27"
                                height="27"
                                className="size-7 object-contain"
                            />
                        ) : (
                            <FileText
                                className="size-5 text-blue-700"
                                aria-hidden="true"
                            />
                        )}
                    </span>
                    <div className="min-w-0 flex-1">
                        <div className="flex min-w-0 flex-wrap items-center gap-2">
                            <h2 className="line-clamp-2 min-w-0 break-words text-sm font-semibold tracking-[-0.02em] text-(--ink) sm:text-[15px]">
                                {document.title}
                            </h2>
                            <span className="inline-flex h-6 shrink-0 items-center rounded-full border border-blue-100 bg-white/75 px-2.5 text-[10px] font-semibold uppercase tracking-[0.03em] text-blue-700">
                                {document.fileType ?? 'Office'}
                            </span>
                        </div>
                        <p className="mt-1.5 truncate text-xs leading-5 text-(--muted-ink)">
                            Từ mẫu {document.sourceTemplate.name}, phiên bản{' '}
                            {document.sourceTemplate.version}
                        </p>
                        <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-500">
                            <Clock3
                                className="size-3.5 shrink-0"
                                aria-hidden="true"
                            />
                            Cập nhật lần cuối{' '}
                            {formatUpdatedAt(document.updatedAt)}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-3 pl-[54px] sm:justify-end sm:pl-0">
                    <span className="text-[11px] text-(--muted-ink) sm:hidden">
                        Có thể khôi phục
                    </span>
                    <Button
                        type="button"
                        size="sm"
                        disabled={isRestoring}
                        onClick={() => onRestore(document)}
                        aria-label={`Khôi phục ${document.title}`}
                        className="h-9 shrink-0 rounded-[12px] bg-blue-600 px-3.5 text-white shadow-[0_7px_18px_rgb(33_118_229/14%)] hover:bg-blue-700 disabled:opacity-70"
                    >
                        {isRestoringThisDocument ? (
                            <LoaderCircle
                                className="size-4 animate-spin motion-reduce:animate-none"
                                aria-hidden="true"
                            />
                        ) : (
                            <RotateCcw aria-hidden="true" />
                        )}
                        {isRestoringThisDocument
                            ? 'Đang khôi phục…'
                            : 'Khôi phục'}
                    </Button>
                </div>
            </article>
        </li>
    );
}

// Gom các mục trong một bề mặt glass đồng nhất với danh sách tài liệu đang hoạt động.
export function TrashDocumentsList({
    documents,
    restoringDocumentId,
    isRestoring,
    onRestore,
}: TrashDocumentsListProps) {
    return (
        <section
            className="overflow-hidden rounded-[24px] border border-white/85 bg-white/38 px-4 shadow-[inset_0_1px_0_rgb(255_255_255/92%)] sm:px-5"
            aria-labelledby="trash-documents-list-heading"
        >
            <div className="flex min-h-14 items-center justify-between border-b border-blue-100/65">
                <h2
                    id="trash-documents-list-heading"
                    className="text-sm font-semibold tracking-[-0.02em] text-(--ink)"
                >
                    Tài liệu đã xóa
                </h2>
                <span className="text-xs tabular-nums text-(--muted-ink)">
                    {documents.length} mục
                </span>
            </div>
            <ul className="m-0 list-none divide-y-0 p-0">
                {documents.map((document) => (
                    <TrashDocumentRow
                        key={document.id}
                        document={document}
                        restoringDocumentId={restoringDocumentId}
                        isRestoring={isRestoring}
                        onRestore={onRestore}
                    />
                ))}
            </ul>
        </section>
    );
}
