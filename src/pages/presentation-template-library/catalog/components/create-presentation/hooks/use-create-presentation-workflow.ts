// Điều phối tạo bản PPTX, tải file đã chỉnh sửa lên và giữ kết quả trong dialog.
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
    createPresentationSchema,
    editedPptxFileSchema,
} from '@/pages/presentation-template-library/catalog/components/create-presentation/schemas/create-presentation.schema';
import type { CreatePresentationFormValues } from '@/pages/presentation-template-library/catalog/components/create-presentation/schemas/create-presentation.schema';
import type { PresentationTemplateSummary } from '@/services/presentation-template';
import type { UserDocumentSummary } from '@/services/document-template';
import { useCreateUserPresentationMutation } from '@/services/presentation-template';
import { useSaveUserDocumentMutation } from '@/services/document-template';

// Tách request và trạng thái file khỏi modal để các thành phần chỉ render thao tác hiện tại.
export function useCreatePresentationWorkflow(
    template: PresentationTemplateSummary | null,
) {
    const [createdPresentation, setCreatedPresentation] =
        useState<UserDocumentSummary | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [createPresentation, createState] =
        useCreateUserPresentationMutation();
    const [saveUserDocument, saveState] = useSaveUserDocumentMutation();
    const form = useForm<CreatePresentationFormValues>({
        resolver: zodResolver(createPresentationSchema),
        defaultValues: { title: '' },
    });
    const { reset } = form;

    // Mỗi mẫu mở một workflow mới và xóa file cũ để không ghi nhầm vào bản sao khác.
    useEffect(() => {
        setCreatedPresentation(null);
        setSelectedFile(null);
        setFileError(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        reset({ title: template?.name ?? '' });
    }, [reset, template?.id, template?.name]);

    // Tạo bản sao theo tên đã nhập; khi lỗi giữ form mở để người dùng thử lại.
    const handleCreatePresentation: SubmitHandler<
        CreatePresentationFormValues
    > = async (values) => {
        if (!template) return;

        try {
            const presentation = await createPresentation({
                templateId: template.id,
                title: values.title || undefined,
            }).unwrap();
            setCreatedPresentation(presentation);
            toast.success('Đã tạo bản sao PPTX riêng từ mẫu.');
        } catch (error) {
            toast.error(
                getApiErrorMessage(error, 'Không thể tạo bản trình chiếu mới.'),
            );
        }
    };

    // Kiểm tra nhanh phần mở rộng/kích thước; backend vẫn xác minh MIME và cấu trúc OOXML.
    function handleFileChange(event: ChangeEvent<HTMLInputElement>): void {
        const file = event.currentTarget.files?.[0];
        if (!file) {
            setSelectedFile(null);
            setFileError(null);
            return;
        }

        const result = editedPptxFileSchema.safeParse(file);
        if (!result.success) {
            setSelectedFile(null);
            setFileError(
                result.error.issues[0]?.message ?? 'File PPTX không hợp lệ.',
            );
            event.currentTarget.value = '';
            return;
        }

        setSelectedFile(result.data);
        setFileError(null);
    }

    // Gửi file PPTX đã sửa để thay nội dung bản sao hiện tại; lỗi không xóa lựa chọn file.
    async function handleSaveEditedPresentation(
        event: FormEvent<HTMLFormElement>,
    ): Promise<void> {
        event.preventDefault();
        if (!createdPresentation || !selectedFile) return;

        try {
            const savedPresentation = await saveUserDocument({
                documentId: createdPresentation.id,
                file: selectedFile,
            }).unwrap();
            setCreatedPresentation(savedPresentation);
            setSelectedFile(null);
            setFileError(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
            toast.success('Đã cập nhật nội dung PPTX đã chỉnh sửa.');
        } catch (error) {
            toast.error(
                getApiErrorMessage(
                    error,
                    'Không thể lưu file PPTX. Hãy kiểm tra định dạng rồi thử lại.',
                ),
            );
        }
    }

    return {
        createdPresentation,
        selectedFile,
        fileError,
        fileInputRef,
        form,
        createState,
        saveState,
        handleCreatePresentation,
        handleFileChange,
        handleSaveEditedPresentation,
    };
}
