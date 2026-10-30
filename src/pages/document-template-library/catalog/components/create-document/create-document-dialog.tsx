// Dialog điều phối các bước tạo bản sao DOCX; workflow và từng khối giao diện được tách khỏi modal shell.
import { Check, FilePlus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { CreateDocumentForm } from '@/pages/document-template-library/catalog/components/create-document/components/create-document-form';
import { CreatedDocumentPanel } from '@/pages/document-template-library/catalog/components/create-document/components/created-document-panel';
import { useCreateDocumentWorkflow } from '@/pages/document-template-library/catalog/components/create-document/hooks/use-create-document-workflow';
import type { CreateDocumentDialogProps } from '@/pages/document-template-library/catalog/components/create-document/types/create-document.types';

// Chọn form tạo hoặc panel tài liệu đã tạo dựa trên kết quả API, còn state và mutation thuộc workflow hook.
export function CreateDocumentDialog({
    template,
    onClose,
}: CreateDocumentDialogProps) {
    const workflow = useCreateDocumentWorkflow(template);
    const { createdDocument } = workflow;

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
                                <DialogTitle className="text-xl sm:text-xl">
                                    {createdDocument
                                        ? 'Bản sao đã sẵn sàng'
                                        : 'Tạo tài liệu từ mẫu'}
                                </DialogTitle>
                                <DialogDescription className="max-w-[540px]">
                                    {createdDocument
                                        ? 'Chọn cách bạn muốn tiếp tục chỉnh sửa.'
                                        : 'Đặt tên cho bản sao DOCX.'}
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    {!createdDocument ? (
                        <CreateDocumentForm
                            templateName={template.name}
                            form={workflow.form}
                            isCreating={workflow.createState.isLoading}
                            onCreate={workflow.handleCreateDocument}
                        />
                    ) : (
                        <CreatedDocumentPanel
                            document={createdDocument}
                            onClose={onClose}
                            uploadForm={{
                                fileInputRef: workflow.fileInputRef,
                                selectedFile: workflow.selectedFile,
                                fileError: workflow.fileError,
                                isSaving: workflow.saveState.isLoading,
                                onFileChange: workflow.handleFileChange,
                                onSave: workflow.handleSaveEditedDocument,
                            }}
                        />
                    )}
                </DialogContent>
            )}
        </Dialog>
    );
}
