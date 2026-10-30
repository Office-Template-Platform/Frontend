// Điều phối state và request của workflow tạo bản sao, sau đó lưu file DOCX đã sửa.
// Hook không sở hữu giao diện; component nhận form, trạng thái và handler để trình bày từng bước.
import {
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
    type FormEvent,
} from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/shared/api/get-api-error-message';
import {
    createDocumentSchema,
    editedDocxFileSchema,
} from '@/pages/document-template-library/catalog/components/create-document/schemas/create-document.schema';
import type { CreateDocumentFormValues } from '@/pages/document-template-library/catalog/components/create-document/types/create-document.types';
import type {
    DocumentTemplateListItem,
    UserDocumentSummary,
} from '@/services/document-template';
import {
    useCreateUserDocumentMutation,
    useSaveUserDocumentMutation,
} from '@/services/document-template';

// Giữ toàn bộ trạng thái tạo/sửa file ở một nơi để dialog và các form con chỉ còn render UI.
// Khi mẫu đổi, reset bản sao, file chọn và tiêu đề để không mang dữ liệu của workflow cũ sang mẫu mới.
// API lỗi được báo qua toast; dữ liệu form và tài liệu hiện có vẫn được giữ nguyên để người dùng thử lại.
export function useCreateDocumentWorkflow(
    template: DocumentTemplateListItem | null,
) {
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
    const { reset } = form;

    // Chọn mẫu mới mở một workflow độc lập; xóa file input cả trong state lẫn DOM để cùng file có thể chọn lại.
    useEffect(() => {
        setCreatedDocument(null);
        setSelectedFile(null);
        setFileError(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        reset({ title: template?.name ?? '' });
    }, [reset, template?.id, template?.name]);

    // Chỉ tạo tài liệu khi dialog còn gắn với một mẫu; lỗi API được hiển thị nhưng không xóa tiêu đề người dùng nhập.
    const handleCreateDocument: SubmitHandler<
        CreateDocumentFormValues
    > = async (values) => {
        if (!template) {
            // Mẫu có thể bị đóng trong lúc submit; không gửi request thiếu nguồn tạo.
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
    };

    // Sàng lọc phần mở rộng và dung lượng ở trình duyệt để báo lỗi sớm; backend vẫn xác thực nội dung thật.
    function handleFileChange(event: ChangeEvent<HTMLInputElement>): void {
        const file = event.currentTarget.files?.[0];
        if (!file) {
            setSelectedFile(null);
            setFileError(null);
            return;
        }

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

    // Chỉ gửi multipart khi tài liệu đã tạo và có file hợp lệ; lỗi lưu không bỏ selection để người dùng thử lại.
    async function handleSaveEditedDocument(
        event: FormEvent<HTMLFormElement>,
    ): Promise<void> {
        event.preventDefault();
        if (!createdDocument || !selectedFile) {
            // Không gửi file rỗng hoặc gắn nội dung vào tài liệu chưa được khởi tạo.
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

    return {
        createdDocument,
        selectedFile,
        fileError,
        fileInputRef,
        form,
        createState,
        saveState,
        handleCreateDocument,
        handleFileChange,
        handleSaveEditedDocument,
    };
}
