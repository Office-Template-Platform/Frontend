// Form nhận bản DOCX đã chỉnh sửa ngoài ứng dụng và gửi lên để cập nhật tài liệu riêng.
import { LoaderCircle, Save, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { EditedDocumentUploadFormProps } from '@/pages/document-template-library/catalog/components/create-document/types/create-document.types';

// Hiển thị file đã chọn và lỗi validation sớm; trạng thái lưu cùng handler do workflow hook sở hữu.
export function EditedDocumentUploadForm({
    fileInputRef,
    selectedFile,
    fileError,
    isSaving,
    onFileChange,
    onSave,
}: EditedDocumentUploadFormProps) {
    return (
        <form
            className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 sm:p-4"
            onSubmit={onSave}
        >
            <div className="flex items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-white bg-white text-blue-700 shadow-sm">
                    <Upload className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-(--ink)">
                        Đã sửa bằng Word?
                    </h3>
                    <p className="mt-0.5 text-xs leading-5 text-(--muted-ink)">
                        Tải bản DOCX đã sửa lên để cập nhật tài liệu này.
                    </p>
                </div>
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
                <label
                    htmlFor="edited-document-file"
                    className="relative flex h-11 min-w-0 cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-2 text-xs shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50/40 has-[:focus-visible]:border-blue-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-200/70"
                >
                    <span className="shrink-0 rounded-lg bg-blue-50 px-3 py-2 font-semibold text-blue-700">
                        Chọn tệp
                    </span>
                    <span className="min-w-0 truncate text-(--muted-ink)">
                        {selectedFile?.name ?? 'Chưa chọn tệp DOCX'}
                    </span>
                    <Input
                        id="edited-document-file"
                        ref={fileInputRef}
                        type="file"
                        accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        aria-invalid={Boolean(fileError)}
                        aria-describedby={
                            fileError
                                ? 'edited-document-file-error'
                                : 'edited-document-file-hint'
                        }
                        onChange={onFileChange}
                        className="absolute inset-0 size-full cursor-pointer opacity-0"
                    />
                </label>
                <Button
                    type="submit"
                    disabled={!selectedFile || isSaving}
                    variant="outline"
                    className="h-11 rounded-xl border-blue-100 bg-white/85 text-blue-800 hover:bg-blue-50 sm:min-w-36"
                >
                    {isSaving ? (
                        <LoaderCircle
                            className="size-4 animate-spin motion-reduce:animate-none"
                            aria-hidden="true"
                        />
                    ) : (
                        <Save aria-hidden="true" />
                    )}
                    {isSaving ? 'Đang cập nhật…' : 'Cập nhật tài liệu'}
                </Button>
            </div>
            <p
                id="edited-document-file-hint"
                className="mt-2 text-[11px] text-(--muted-ink)"
            >
                Chỉ nhận DOCX, tối đa 25 MB.
            </p>
            {fileError && (
                <p
                    id="edited-document-file-error"
                    className="mt-2 text-xs text-red-600"
                    role="alert"
                >
                    {fileError}
                </p>
            )}
        </form>
    );
}
