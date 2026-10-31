// Dialog tạo bản sao PPTX và chuyển sang các lựa chọn chỉnh sửa sau khi API hoàn tất.
import { Check, FilePlus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { CreatePresentationForm } from '@/pages/presentation-template-library/catalog/components/create-presentation/components/create-presentation-form';
import { CreatedPresentationPanel } from '@/pages/presentation-template-library/catalog/components/create-presentation/components/created-presentation-panel';
import { useCreatePresentationWorkflow } from '@/pages/presentation-template-library/catalog/components/create-presentation/hooks/use-create-presentation-workflow';
import type { PresentationTemplateSummary } from '@/services/presentation-template';

type CreatePresentationDialogProps = {
    template: PresentationTemplateSummary | null;
    onClose: () => void;
};

// Dùng cùng một hộp thoại cho bước đặt tên và bước quản lý bản PPTX đã tạo.
export function CreatePresentationDialog({
    template,
    onClose,
}: CreatePresentationDialogProps) {
    const workflow = useCreatePresentationWorkflow(template);
    const { createdPresentation } = workflow;

    return (
        <Dialog
            open={Boolean(template)}
            onOpenChange={(isOpen) => {
                if (!isOpen) onClose();
            }}
        >
            {template && (
                <DialogContent className="max-w-[680px] rounded-[28px] border-white/90 bg-white/90 p-4.5 shadow-[0_40px_110px_rgba(37,99,235,0.2)] backdrop-blur-2xl sm:p-6">
                    <div
                        className="pointer-events-none absolute -top-16 right-12 size-56 rounded-full bg-blue-200/35 blur-3xl"
                        aria-hidden="true"
                    />
                    <DialogHeader className="relative gap-0 pr-12">
                        <div className="flex items-start gap-3.5">
                            <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-[14px] border border-white/90 bg-gradient-to-br from-blue-50 to-sky-100 text-blue-600 shadow-[0_8px_24px_rgba(37,99,235,0.12)]">
                                {createdPresentation ? (
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
                                    {createdPresentation
                                        ? 'Bản sao đã sẵn sàng'
                                        : 'Tạo bài thuyết trình từ mẫu'}
                                </DialogTitle>
                                <DialogDescription className="max-w-[560px]">
                                    {createdPresentation
                                        ? 'Chỉnh sửa trực tiếp trên web, tải xuống hoặc cập nhật bằng file PPTX đã sửa.'
                                        : 'Đặt tên cho bản sao PPTX.'}
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    {!createdPresentation ? (
                        <CreatePresentationForm
                            templateName={template.name}
                            form={workflow.form}
                            isCreating={workflow.createState.isLoading}
                            onCreate={workflow.handleCreatePresentation}
                        />
                    ) : (
                        <CreatedPresentationPanel
                            document={createdPresentation}
                            onClose={onClose}
                            uploadForm={{
                                fileInputRef: workflow.fileInputRef,
                                selectedFile: workflow.selectedFile,
                                fileError: workflow.fileError,
                                isSaving: workflow.saveState.isLoading,
                                onFileChange: workflow.handleFileChange,
                                onSave: workflow.handleSaveEditedPresentation,
                            }}
                        />
                    )}
                </DialogContent>
            )}
        </Dialog>
    );
}
