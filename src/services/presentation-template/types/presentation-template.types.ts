// Hợp đồng metadata của một mẫu trình chiếu theo response catalog từ backend.
export type PresentationTemplateSummary = {
    // ID ổn định để định danh mẫu trong URL và cache.
    id: string;
    // Tên hiển thị của bộ trình chiếu.
    name: string;
    // Nhãn danh mục mà backend gán cho bộ mẫu.
    category: string;
    // Mô tả ngắn dùng trên card catalog.
    description: string;
    // URL ảnh đại diện hoặc ảnh xem trước; null nếu backend chưa cung cấp.
    previewUrl: string | null;
    // Số slide của bộ mẫu, dùng làm metadata tóm tắt.
    slideCount: number;
};

// Một ảnh xem trước được backend liên kết với số thứ tự trong version hiện hành.
export type PresentationSlidePreviewSummary = {
    slideNumber: number;
    title: string | null;
    previewUrl: string;
};

// Detail API trả metadata catalog cùng toàn bộ URL preview theo thứ tự slide.
export type PresentationTemplateDetail = PresentationTemplateSummary & {
    slug: string;
    categoryId: string;
    slides: PresentationSlidePreviewSummary[];
    createdAt: string;
    updatedAt: string;
};

// Payload tạo bản sao độc lập; backend tự dùng tên mẫu nếu title không được gửi.
export type CreateUserPresentationRequest = {
    templateId: string;
    title?: string;
};
