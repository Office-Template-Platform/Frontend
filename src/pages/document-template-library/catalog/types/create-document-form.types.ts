// Kiểu form tạo bản sao DOCX được suy ra từ schema Zod của feature.
import type { z } from 'zod';
import type { createDocumentSchema } from '@/pages/document-template-library/catalog/schemas/create-document.schema';

export type CreateDocumentFormValues = z.infer<typeof createDocumentSchema>;
