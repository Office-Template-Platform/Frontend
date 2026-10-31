// Kiểu giao diện cho form tải PPTX đã sửa và panel bản sao đã tạo.
import type { ChangeEventHandler, FormEventHandler, RefObject } from 'react';
import type { UserDocumentSummary } from '@/services/document-template';

export type PresentationUploadFormProps = {
    fileInputRef: RefObject<HTMLInputElement | null>;
    selectedFile: File | null;
    fileError: string | null;
    isSaving: boolean;
    onFileChange: ChangeEventHandler<HTMLInputElement>;
    onSave: FormEventHandler<HTMLFormElement>;
};

export type CreatedPresentationPanelProps = {
    document: UserDocumentSummary;
    onClose: () => void;
    uploadForm: PresentationUploadFormProps;
};
