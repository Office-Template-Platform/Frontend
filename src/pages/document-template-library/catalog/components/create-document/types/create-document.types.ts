// Kiểu dữ liệu của feature tạo tài liệu: form values và hợp đồng giữa dialog với các component con.
import type { ChangeEventHandler, FormEventHandler, RefObject } from 'react';
import type { SubmitHandler, UseFormReturn } from 'react-hook-form';
import type { z } from 'zod';
import type {
    DocumentTemplateListItem,
    UserDocumentSummary,
} from '@/services/document-template';
import type { createDocumentSchema } from '@/pages/document-template-library/catalog/components/create-document/schemas/create-document.schema';

// Đồng bộ kiểu đầu vào của form với schema đang xác thực tiêu đề tài liệu.
export type CreateDocumentFormValues = z.infer<typeof createDocumentSchema>;

// Mẫu được chọn điều khiển trạng thái mở; onClose đóng dialog mà không thay đổi tài liệu đã tạo.
export type CreateDocumentDialogProps = {
    template: DocumentTemplateListItem | null;
    onClose: () => void;
};

// Dữ liệu form tiêu đề và handler đã qua validation của react-hook-form.
export type CreateDocumentFormProps = {
    templateName: string;
    form: UseFormReturn<CreateDocumentFormValues>;
    isCreating: boolean;
    onCreate: SubmitHandler<CreateDocumentFormValues>;
};

// Trạng thái và event cần thiết để chọn, xác thực sơ bộ và gửi file DOCX đã sửa.
export type EditedDocumentUploadFormProps = {
    fileInputRef: RefObject<HTMLInputElement | null>;
    selectedFile: File | null;
    fileError: string | null;
    isSaving: boolean;
    onFileChange: ChangeEventHandler<HTMLInputElement>;
    onSave: FormEventHandler<HTMLFormElement>;
};

// Metadata tài liệu điều khiển các hành động tiếp theo; form upload được truyền vào để panel không sở hữu request.
export type CreatedDocumentPanelProps = {
    document: UserDocumentSummary;
    onClose: () => void;
    uploadForm: EditedDocumentUploadFormProps;
};
