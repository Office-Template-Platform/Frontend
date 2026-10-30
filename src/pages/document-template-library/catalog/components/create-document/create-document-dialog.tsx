// Workflow tạo bản sao DOCX, tải xuống và nhận lại bản đã chỉnh sửa từ ứng dụng tương thích.
import {
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
    type FormEvent,
} from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    ArrowDownToLine,
    Check,
    FilePlus,
    FileText,
    LoaderCircle,
    Save,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { getApiResourceUrl } from '@/shared/api/api-client';
import { getApiErrorMessage } from '@/shared/api/get-api-error-message';
import {
    createDocumentSchema,
    editedDocxFileSchema,
} from '@/pages/document-template-library/catalog/schemas/create-document.schema';
import {
    useCreateUserDocumentMutation,
    useSaveUserDocumentMutation,
    type UserDocumentSummary,
} from '@/services/document-template';
import type { CreateDocumentFormValues } from '@/pages/document-template-library/catalog/types/create-document-form.types';
import type { CreateDocumentDialogProps } from '@/pages/document-template-library/catalog/types/create-document-dialog.types';

// Tạo bản sao theo templateId; API chỉ trả file độc lập và không ghi lên asset gốc.
export function CreateDocumentDialog({
    template,
    onClose,
}: CreateDocumentDialogProps) {
    const [createdDocument, setCreatedDocument] =
        useState<UserDocumentSummary | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [createUserDocument, createState] = useCreateUserDocumentMutation();
    const [saveUserDocument, saveState] = useSaveUserDocumentMutation();
    const form = useForm<CreateDocumentFormValues>({
        resolver: zodResolver(createDocumentSchema),
        defaultValues: { title: '' },
    });

    useEffect(() => {
        // Mỗi mẫu mới bắt đầu một workflow riêng; đóng dialog xóa file state của lần trước.
        setCreatedDocument(null);
        setSelectedFile(null);
        setFileError(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        form.reset({ title: template?.name ?? '' });
    }, [form.reset, template?.id, template?.name]);

    // Xác thực tiêu đề bằng schema rồi giữ lỗi API trong toast để không mất nội dung form.
    async function handleCreateDocument(values: CreateDocumentFormValues) {
        if (!template) {
            // Dialog có thể đóng trong lúc request form hoàn tất; khi đó không tạo mẫu không xác định.
            return;
        }

        try {
            const document = await createUserDocument({
                templateId: template.id,
                title: values.title || undefined,
            }).unwrap();
            setCreatedDocument(document);
            toast.success('Đã tạo bản sao DOCX riêng từ mẫu.');
        } catch (error) {
            toast.error(
                getApiErrorMessage(error, 'Không thể tạo tài liệu mới.'),
            );
        }
    }

    // Kiểm tra phần mở rộng và giới hạn dung lượng trước khi gửi file tới backend.
    function handleFileChange(event: ChangeEvent<HTMLInputElement>): void {
        const file = event.currentTarget.files?.[0];
        if (!file) {
            setSelectedFile(null);
            setFileError(null);
            return;
        }

        // Zod chỉ sàng lọc sớm; backend vẫn kiểm tra MIME và cấu trúc OOXML thật.
        const result = editedDocxFileSchema.safeParse(file);
        if (!result.success) {
            setSelectedFile(null);
            setFileError(
                result.error.issues[0]?.message ?? 'File DOCX không hợp lệ.',
            );
            event.currentTarget.value = '';
            return;
        }

        setSelectedFile(result.data);
        setFileError(null);
    }

    // Chỉ lưu file sau khi đã tạo tài liệu; backend thay file theo transaction và giữ bản trước nếu lỗi.
    async function handleSaveEditedDocument(
        event: FormEvent<HTMLFormElement>,
    ): Promise<void> {
        event.preventDefault();
        if (!createdDocument || !selectedFile) {
            // Không gửi multipart rỗng hoặc gắn file vào tài liệu chưa sẵn sàng.
            return;
        }

        try {
            const savedDocument = await saveUserDocument({
                documentId: createdDocument.id,
                file: selectedFile,
            }).unwrap();
            setCreatedDocument(savedDocument);
            setSelectedFile(null);
            setFileError(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
            toast.success('Đã lưu nội dung DOCX đã chỉnh sửa.');
        } catch (error) {
            toast.error(
                getApiErrorMessage(
                    error,
                    'Không thể lưu file. Hãy kiểm tra định dạng DOCX rồi thử lại.',
                ),
            );
        }
    }

    const downloadUrl = createdDocument?.downloadUrl
        ? getApiResourceUrl(createdDocument.downloadUrl)
        : null;

    return (
        <Dialog
            open={Boolean(template)}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
        >
            {template && (
                <DialogContent className="max-w-[620px] rounded-[28px] border-white/90 bg-white/90 p-4.5 shadow-[0_40px_110px_rgba(37,99,235,0.2)] backdrop-blur-2xl sm:p-6">
                    <div
                        className="pointer-events-none absolute -top-16 right-12 size-56 rounded-full bg-blue-200/35 blur-3xl"
                        aria-hidden="true"
                    />
                    <DialogHeader className="relative gap-0 pr-12">
                        <div className="flex items-start gap-3.5">
                            <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-[14px] border border-white/90 bg-gradient-to-br from-blue-50 to-sky-100 text-blue-600 shadow-[0_8px_24px_rgba(37,99,235,0.12)]">
                                {createdDocument ? (
                                    <Check
                                        className="size-4.5"
                                        aria-hidden="true"
                                    />
                                ) : (
                                    <FilePlus
                                        className="size-4.5"
                                        aria-hidden="true"
                                    />
                                )}
                            </span>
                            <div className="min-w-0 pt-0.5">
                                <DialogTitle className="text-xl sm:text-2xl">
                                    {createdDocument
                                        ? 'Bản sao đã sẵn sàng'
                                        : 'Tạo tài liệu từ mẫu'}
                                </DialogTitle>
                                <DialogDescription className="mt-1.5 max-w-[540px]">
                                    {createdDocument
                                        ? 'Tải về chỉnh sửa bằng Word, rồi tải file mới lên để lưu.'
                                        : 'Đặt tên cho bản sao DOCX.'}
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    {!createdDocument ? (
                        <form
                            className="relative mt-4 space-y-3"
                            onSubmit={form.handleSubmit(handleCreateDocument)}
                        >
                            <div className="flex flex-col gap-2.5 rounded-[18px] border border-blue-100/70 bg-white/60 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:flex-row sm:items-center sm:justify-between">
                                <span className="flex size-9 shrink-0 items-center justify-center rounded-[12px] border border-white bg-blue-50/90 text-blue-600 shadow-sm">
                                    <FileText
                                        className="size-4"
                                        aria-hidden="true"
                                    />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="text-[10px] font-semibold tracking-[0.12em] text-slate-500 uppercase">
                                        Mẫu nguồn
                                    </p>
                                    <p className="mt-0.5 truncate text-sm font-semibold text-(--ink)">
                                        {template.name}
                                    </p>
                                </div>
                                <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50/80 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                                    <Check
                                        className="size-3.5"
                                        aria-hidden="true"
                                    />
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
                                    aria-invalid={Boolean(
                                        form.formState.errors.title,
                                    )}
                                    aria-describedby={
                                        form.formState.errors.title
                                            ? 'new-document-title-error'
                                            : 'new-document-title-hint'
                                    }
                                    className="h-12 rounded-[15px] border-blue-100/80 bg-white/90 px-4 text-sm text-(--ink) shadow-[0_2px_8px_rgba(37,99,235,0.04)] placeholder:text-slate-400 focus-visible:border-blue-300 focus-visible:ring-blue-200/60"
                                    {...form.register('title')}
                                />
                                {form.formState.errors.title ? (
                                    <p
                                        id="new-document-title-error"
                                        className="text-xs text-red-600"
                                    >
                                        {form.formState.errors.title.message}
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
                                    disabled={createState.isLoading}
                                    className="h-11 w-full rounded-[14px] bg-blue-600 px-4 text-white shadow-[0_10px_24px_rgba(33,118,229,0.22)] transition-[background-color,box-shadow,transform] hover:bg-blue-700 hover:shadow-[0_14px_28px_rgba(33,118,229,0.28)] sm:w-auto"
                                >
                                    {createState.isLoading ? (
                                        <LoaderCircle
                                            className="size-4 animate-spin"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <FilePlus aria-hidden="true" />
                                    )}
                                    {createState.isLoading
                                        ? 'Đang tạo bản sao...'
                                        : 'Tạo bản sao DOCX'}
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <section className="relative mt-6 space-y-4">
                            <div className="flex items-start gap-3 rounded-[17px] border border-emerald-100 bg-emerald-50/75 p-3.5">
                                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
                                    <Check
                                        className="size-4"
                                        aria-hidden="true"
                                    />
                                </span>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-emerald-950">
                                        {createdDocument.title}
                                    </p>
                                    <p className="mt-0.5 text-xs leading-5 text-emerald-800/80">
                                        Bản sao thuộc phiên bản mẫu v
                                        {createdDocument.sourceTemplate.version}{' '}
                                        và có thể tải về.
                                    </p>
                                </div>
                            </div>

                            {downloadUrl ? (
                                <Button
                                    asChild
                                    className="h-11 w-full rounded-[14px] bg-blue-600 text-white shadow-[0_10px_25px_rgba(33,118,229,0.2)] hover:bg-blue-700"
                                >
                                    <a href={downloadUrl} download>
                                        <ArrowDownToLine aria-hidden="true" />
                                        Tải tài liệu DOCX
                                    </a>
                                </Button>
                            ) : (
                                <p
                                    className="rounded-[14px] border border-amber-100 bg-amber-50/75 p-3 text-xs leading-5 text-amber-800"
                                    role="status"
                                >
                                    Tài liệu đang được chuẩn bị. Hãy đóng hộp
                                    thoại và thử lại sau.
                                </p>
                            )}

                            <form
                                className="space-y-3 rounded-[19px] border border-white/85 bg-white/45 p-4"
                                onSubmit={handleSaveEditedDocument}
                            >
                                <div className="flex items-center gap-2 text-sm font-semibold text-(--ink)">
                                    <Save
                                        className="size-4 text-blue-600"
                                        aria-hidden="true"
                                    />
                                    Lưu bản đã chỉnh sửa
                                </div>
                                <p className="text-xs leading-5 text-(--muted-ink)">
                                    Sau khi sửa file trong Word, tải bản DOCX đó
                                    lên đây để cập nhật tài liệu đã tạo.
                                </p>
                                <Input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                    aria-label="Chọn file DOCX đã chỉnh sửa"
                                    aria-invalid={Boolean(fileError)}
                                    onChange={handleFileChange}
                                    className="h-11 rounded-[13px] border-white/90 bg-white/70 p-1.5 text-xs file:mr-2 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:text-xs file:font-semibold file:text-blue-700"
                                />
                                <p className="text-[11px] text-(--muted-ink)">
                                    Chỉ nhận .docx, tối đa 25 MB.
                                </p>
                                {fileError && (
                                    <p
                                        className="text-xs text-red-600"
                                        role="alert"
                                    >
                                        {fileError}
                                    </p>
                                )}
                                <Button
                                    type="submit"
                                    disabled={
                                        !selectedFile || saveState.isLoading
                                    }
                                    variant="outline"
                                    className="h-10 w-full rounded-[13px] border-blue-100 bg-white/75 text-blue-800 hover:bg-blue-50"
                                >
                                    {saveState.isLoading ? (
                                        <LoaderCircle
                                            className="size-4 animate-spin"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <Save aria-hidden="true" />
                                    )}
                                    {saveState.isLoading
                                        ? 'Đang lưu tài liệu...'
                                        : 'Lưu file đã chỉnh sửa'}
                                </Button>
                            </form>
                        </section>
                    )}
                </DialogContent>
            )}
        </Dialog>
    );
}
