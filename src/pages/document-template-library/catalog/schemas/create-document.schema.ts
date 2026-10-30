// Kiểm tra tiêu đề tùy chọn trước khi gọi API tạo bản DOCX độc lập.
import { z } from 'zod';

export const createDocumentSchema = z.object({
    title: z
        .string()
        .trim()
        .max(200, 'Tên tài liệu không được dài quá 200 ký tự.'),
});

export const editedDocxFileSchema = z
    .custom<File>(
        (file) => typeof File !== 'undefined' && file instanceof File,
        'Vui lòng chọn file DOCX đã chỉnh sửa.',
    )
    .refine((file) => file.name.toLowerCase().endsWith('.docx'), {
        message: 'Chỉ chấp nhận file có định dạng .docx.',
    })
    .refine((file) => file.size <= 25 * 1024 * 1024, {
        message: 'File DOCX không được vượt quá 25 MB.',
    });
