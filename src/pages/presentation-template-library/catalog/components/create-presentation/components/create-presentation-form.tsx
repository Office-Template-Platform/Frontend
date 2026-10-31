// Form đặt tên bản sao PPTX với phần mô tả rõ mẫu gốc được giữ nguyên.
import { Check, FilePlus, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import powerpointIcon from '@/assets/icons/microsoft-365/powerpoint.svg';
import type { CreatePresentationFormValues } from '@/pages/presentation-template-library/catalog/components/create-presentation/schemas/create-presentation.schema';
import type { SubmitHandler, UseFormReturn } from 'react-hook-form';

type CreatePresentationFormProps = {
    templateName: string;
    form: UseFormReturn<CreatePresentationFormValues>;
    isCreating: boolean;
    onCreate: SubmitHandler<CreatePresentationFormValues>;
};

// Giữ lỗi tên gắn sát trường nhập và không khóa dialog khi API báo lỗi.
export function CreatePresentationForm({
    templateName,
    form,
    isCreating,
    onCreate,
}: CreatePresentationFormProps) {
    const titleError = form.formState.errors.title;

    return (
        <form
            className="relative mt-4 space-y-3"
            onSubmit={form.handleSubmit(onCreate)}
        >
            <div className="flex flex-col gap-2.5 rounded-[18px] border border-blue-100/70 bg-white/60 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:flex-row sm:items-center sm:justify-between">
                <span className="grid size-10 shrink-0 place-items-center rounded-[13px] border border-white bg-white shadow-sm">
                    <img
                        src={powerpointIcon}
                        alt=""
                        className="size-7 object-contain"
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
                    htmlFor="new-presentation-title"
                    className="mb-2 flex items-center justify-between gap-3"
                >
                    <span className="text-xs font-semibold text-(--ink)">
                        Tên bài thuyết trình
                    </span>
                    <span className="rounded-full bg-slate-100/80 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                        Tùy chọn
                    </span>
                </label>
                <Input
                    id="new-presentation-title"
                    autoFocus
                    maxLength={200}
                    placeholder="Nhập tên cho bản sao PPTX"
                    aria-invalid={Boolean(titleError)}
                    aria-describedby={
                        titleError
                            ? 'new-presentation-title-error'
                            : 'new-presentation-title-hint'
                    }
                    className="h-12 rounded-[15px] border-blue-100/80 bg-white/90 px-4 text-sm text-(--ink) shadow-[0_2px_8px_rgba(37,99,235,0.04)] placeholder:text-slate-400 focus-visible:border-blue-300 focus-visible:ring-blue-200/60"
                    {...form.register('title')}
                />
                {titleError ? (
                    <p
                        id="new-presentation-title-error"
                        className="mt-2 text-xs text-red-600"
                    >
                        {titleError.message}
                    </p>
                ) : (
                    <p
                        id="new-presentation-title-hint"
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
                    className="h-11 w-full rounded-[14px] bg-blue-600 px-4 text-white shadow-[0_10px_24px_rgba(33,118,229,0.22)] hover:bg-blue-700 sm:w-auto"
                >
                    {isCreating ? (
                        <LoaderCircle
                            className="size-4 animate-spin motion-reduce:animate-none"
                            aria-hidden="true"
                        />
                    ) : (
                        <FilePlus aria-hidden="true" />
                    )}
                    {isCreating ? 'Đang tạo bản sao…' : 'Tạo bản sao PPTX'}
                </Button>
            </div>
        </form>
    );
}
