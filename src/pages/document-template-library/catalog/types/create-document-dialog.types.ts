// Props của workflow tạo bản sao và lưu file DOCX đã chỉnh sửa.
import type { DocumentTemplateListItem } from '@/services/document-template';

export type CreateDocumentDialogProps = {
    template: DocumentTemplateListItem | null;
    onClose: () => void;
};
