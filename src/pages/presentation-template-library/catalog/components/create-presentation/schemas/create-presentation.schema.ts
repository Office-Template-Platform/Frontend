// Xác thực tên bản sao và file PPTX đã chỉnh sửa trước khi gửi API.
import { z } from 'zod';

export const createPresentationSchema = z.object({
    title: z
        .string()
        .trim()
        .max(200, 'Tên bài thuyết trình không được dài quá 200 ký tự.'),
});

export const editedPptxFileSchema = z
    .custom<File>(
        (file) => typeof File !== 'undefined' && file instanceof File,
        'Vui lòng chọn file PPTX đã chỉnh sửa.',
    )
    .refine((file) => file.name.toLowerCase().endsWith('.pptx'), {
        message: 'Chỉ chấp nhận file có định dạng .pptx.',
    })
    .refine((file) => file.size <= 25 * 1024 * 1024, {
        message: 'File PPTX không được vượt quá 25 MB.',
    });

export type CreatePresentationFormValues = z.infer<
    typeof createPresentationSchema
>;
