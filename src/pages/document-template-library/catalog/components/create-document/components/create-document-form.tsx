// Form của bước tạo bản sao: chỉ trình bày nguồn mẫu và nhận tiêu đề theo schema của feature.
import { Check, FilePlus, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import wordIcon from '@/assets/icons/microsoft-365/word.svg';
import type { CreateDocumentFormProps } from '@/pages/document-template-library/catalog/components/create-document/types/create-document.types';

// Giữ validation và lỗi trường tiêu đề gắn với form để người dùng sửa trực tiếp trước khi tạo tài liệu.
export function CreateDocumentForm({
    templateName,
    form,
    isCreating,
    onCreate,
}: CreateDocumentFormProps) {
    const titleError = form.formState.errors.title;

    return (
        <form
            className="relative mt-4 space-y-3"
            onSubmit={form.handleSubmit(onCreate)}
        >
            <div className="flex flex-col gap-2.5 rounded-[18px] border border-blue-100/70 bg-white/60 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:flex-row sm:items-center sm:justify-between">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-[12px] border border-white bg-blue-50/90 text-blue-600 shadow-sm">
                    <img
                        src={wordIcon}
                        alt=""
                        className="size-6 object-contain"
                    />
                </span>
                <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold tracking-[0.12em] text-slate-500 uppercase">
                        Mẫu nguồn
                    </p>
                    <p className="mt-0.5 truncate text-sm font-semibold text-(--ink)">
                        {templateName}
                    </p>
                </div>
                <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50/80 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                    <Check className="size-3.5" aria-hidden="true" />
                    Mẫu nguồn giữ nguyên
                </span>
            </div>

            <div className="rounded-[18px] border border-white/90 bg-white/45 p-3.5 sm:p-4">
                <label
                    htmlFor="new-document-title"
                    className="mb-2 flex items-center justify-between gap-3"
                >
                    <span className="text-xs font-semibold text-(--ink)">
                        Tên tài liệu
                    </span>
                    <span className="rounded-full bg-slate-100/80 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                        Tùy chọn
                    </span>
                </label>
                <Input
                    id="new-document-title"
                    autoFocus
                    maxLength={200}
                    placeholder="Nhập tên cho tài liệu mới"
                    aria-invalid={Boolean(titleError)}
                    aria-describedby={
                        titleError
                            ? 'new-document-title-error'
                            : 'new-document-title-hint'
                    }
                    className="h-12 rounded-[15px] border-blue-100/80 bg-white/90 px-4 text-sm text-(--ink) shadow-[0_2px_8px_rgba(37,99,235,0.04)] placeholder:text-slate-400 focus-visible:border-blue-300 focus-visible:ring-blue-200/60"
                    {...form.register('title')}
                />
                {titleError ? (
                    <p
                        id="new-document-title-error"
                        className="text-xs text-red-600"
                    >
                        {titleError.message}
                    </p>
                ) : (
                    <p
                        id="new-document-title-hint"
                        className="mt-2 text-xs leading-5 text-(--muted-ink)"
                    >
                        Để trống để dùng tên mẫu.
                    </p>
                )}
            </div>

            <div className="flex justify-end border-t border-slate-200/70 pt-3">
                <Button
                    type="submit"
                    disabled={isCreating}
                    className="h-11 w-full rounded-[14px] bg-blue-600 px-4 text-white shadow-[0_10px_24px_rgba(33,118,229,0.22)] transition-[background-color,box-shadow,transform] hover:bg-blue-700 hover:shadow-[0_14px_28px_rgba(33,118,229,0.28)] sm:w-auto"
                >
                    {isCreating ? (
                        <LoaderCircle
                            className="size-4 animate-spin"
                            aria-hidden="true"
                        />
                    ) : (
                        <FilePlus aria-hidden="true" />
                    )}
                    {isCreating ? 'Đang tạo bản sao...' : 'Tạo bản sao DOCX'}
                </Button>
            </div>
        </form>
    );
}
