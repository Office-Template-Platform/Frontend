// Hộp xác nhận chuyển tài liệu vào thùng rác và giải thích dữ liệu có thể khôi phục.
import { FileText, LoaderCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import powerpointIcon from '@/assets/icons/microsoft-365/powerpoint.svg';
import wordIcon from '@/assets/icons/microsoft-365/word.svg';
import type { UserDocumentSummary } from '@/services/document-template';

type DeleteUserDocumentDialogProps = {
    document: UserDocumentSummary | null;
    isDeleting: boolean;
    onCancel: () => void;
    onConfirm: () => void;
};

// Giữ modal mở trong khi request chạy để thao tác chuyển vào thùng rác không bị gửi lặp.
export function DeleteUserDocumentDialog({
    document,
    isDeleting,
    onCancel,
    onConfirm,
}: DeleteUserDocumentDialogProps) {
    const documentIcon =
        document?.fileType === 'pptx'
            ? powerpointIcon
            : document?.fileType === 'docx'
              ? wordIcon
              : null;

    return (
        <Dialog
            open={Boolean(document)}
            onOpenChange={(isOpen) => {
                if (!isOpen && !isDeleting) onCancel();
            }}
        >
            {document && (
                <DialogContent
                    showCloseButton={!isDeleting}
                    aria-busy={isDeleting}
                    className="max-w-[480px] rounded-[28px] border-white/90 bg-white/95 p-5 shadow-[0_36px_100px_rgba(157,47,65,0.2)] sm:p-6"
                >
                    <div
                        className="pointer-events-none absolute -top-16 right-8 size-48 rounded-full bg-rose-200/40 blur-3xl"
                        aria-hidden="true"
                    />
                    <div className="relative flex items-start gap-3.5 pr-9">
                        <span className="grid size-11 shrink-0 place-items-center rounded-[15px] border border-rose-100 bg-rose-50 text-rose-600 shadow-[inset_0_1px_0_rgb(255_255_255/95%),0_8px_22px_rgb(225_29_72/10%)]">
                            <Trash2 className="size-5" aria-hidden="true" />
                        </span>
                        <DialogHeader className="gap-1 p-0">
                            <DialogTitle className="text-lg sm:text-xl">
                                Chuyển tài liệu vào thùng rác?
                            </DialogTitle>
                            <DialogDescription className="text-[13px] leading-5">
                                Tài liệu sẽ được chuyển khỏi danh sách hiện tại.
                                Bạn có thể khôi phục bất cứ lúc nào.
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <div className="relative mt-5 flex min-w-0 items-center gap-3 rounded-[17px] border border-rose-100/80 bg-rose-50/45 p-3.5">
                        <span className="grid size-11 shrink-0 place-items-center rounded-[14px] border border-white bg-white shadow-sm">
                            {documentIcon ? (
                                <img
                                    src={documentIcon}
                                    alt=""
                                    className="size-7 object-contain"
                                />
                            ) : (
                                <FileText
                                    className="size-5 text-rose-600"
                                    aria-hidden="true"
                                />
                            )}
                        </span>
                        <div className="min-w-0 flex-1">
                            <p className="break-words text-sm font-semibold text-(--ink)">
                                {document.title}
                            </p>
                            <p className="mt-1 flex flex-wrap items-center gap-x-2 text-[11px] text-(--muted-ink)">
                                <span>
                                    {document.fileType?.toUpperCase() ??
                                        'Tài liệu Office'}
                                </span>
                                <span>
                                    Từ mẫu {document.sourceTemplate.name}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="relative mt-3 rounded-[15px] border border-rose-100/90 bg-rose-50/70 px-3.5 py-3">
                        <p className="text-xs font-semibold text-rose-900">
                            Bản riêng và file đầu ra hiện có sẽ được giữ nguyên.
                        </p>
                        <p className="mt-1 text-[11px] leading-5 text-rose-800/85">
                            Bạn có thể khôi phục tài liệu từ mục Thùng rác.
                        </p>
                    </div>

                    <div className="relative mt-5 flex flex-col-reverse gap-2 border-t border-slate-200/70 pt-4 sm:flex-row sm:justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isDeleting}
                            onClick={onCancel}
                            className="h-10 rounded-[13px] border-slate-200 bg-white/80 px-4 text-slate-700 hover:bg-slate-50"
                        >
                            Giữ lại
                        </Button>
                        <Button
                            type="button"
                            disabled={isDeleting}
                            onClick={onConfirm}
                            className="h-10 rounded-[13px] bg-rose-600 px-4 text-white shadow-[0_8px_20px_rgb(225_29_72/20%)] hover:bg-rose-700"
                        >
                            {isDeleting ? (
                                <LoaderCircle
                                    className="size-4 animate-spin motion-reduce:animate-none"
                                    aria-hidden="true"
                                />
                            ) : (
                                <Trash2 aria-hidden="true" />
                            )}
                            {isDeleting
                                ? 'Đang chuyển…'
                                : 'Chuyển vào thùng rác'}
                        </Button>
                    </div>
                </DialogContent>
            )}
        </Dialog>
    );
}
