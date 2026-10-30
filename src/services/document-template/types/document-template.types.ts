// Hợp đồng dữ liệu DOCX trao đổi với backend; giữ kiểu này ở service để UI không định nghĩa lại DTO.

// Một mẫu DOCX trong response danh sách; chỉ chứa metadata cần cho catalog.
export type DocumentTemplateListItem = {
    // ID ổn định dùng để gọi detail, tạo tài liệu và định danh cache.
    id: string;
    // Đường dẫn thân thiện của mẫu, thường dùng trong URL hoặc tra cứu.
    slug: string;
    // Tên hiển thị trong card và hộp thoại.
    name: string;
    // Mô tả có thể thiếu trong dữ liệu backend.
    description: string | null;
    // Danh mục gắn với mẫu, được lồng trong response để UI không cần gọi riêng từng mẫu.
    category: {
        // ID dùng làm giá trị bộ lọc theo danh mục.
        id: string;
        // Tên danh mục để hiển thị trực tiếp cho người dùng.
        name: string;
        // Định danh thân thiện của danh mục trong URL hoặc tra cứu.
        slug: string;
    };
    // Cờ để UI đánh dấu mẫu nổi bật; giá trị do backend quản lý.
    isFeatured: boolean;
    // Phiên bản đang được phát hành và dùng làm nguồn tạo tài liệu.
    currentVersion: number;
    // URL ảnh xem trước; null nếu mẫu chưa có ảnh preview.
    previewUrl: string | null;
};

// Thông tin bổ sung chỉ có ở endpoint detail, dùng trong hộp thoại xem mẫu.
export type DocumentTemplateDetail = DocumentTemplateListItem & {
    // Thời điểm tạo bản ghi mẫu theo định dạng ISO từ backend.
    createdAt: string;
    // Thời điểm cập nhật metadata gần nhất theo định dạng ISO từ backend.
    updatedAt: string;
};

// Danh mục để xây dựng bộ lọc; templateCount là tổng mẫu thuộc danh mục.
export type DocumentTemplateCategory = {
    // Định danh được truyền lên API khi chọn category filter.
    id: string;
    // Nhãn mà UI hiển thị trong danh sách bộ lọc.
    name: string;
    // Định danh ổn định, thân thiện với URL.
    slug: string;
    // Tổng số mẫu hiện thuộc danh mục này theo backend.
    templateCount: number;
};

// Phần data của response phân trang; meta HTTP bên ngoài được tách ở ApiSuccessResponse.
export type PagedDocumentTemplates = {
    // Các mẫu trong trang hiện tại.
    items: DocumentTemplateListItem[];
    // Tổng số mẫu phù hợp với toàn bộ điều kiện lọc.
    total: number;
    // Trang hiện tại backend trả về.
    page: number;
    // Số phần tử tối đa trong một trang.
    limit: number;
    // Tổng số trang để điều khiển phân trang ở UI.
    totalPages: number;
};

// Tham số GET danh sách; page và limit luôn được truyền, các bộ lọc còn lại là tùy chọn.
export type DocumentTemplateListQuery = {
    page: number;
    limit: number;
    // Từ khóa tìm kiếm do backend xử lý.
    search?: string;
    // ID danh mục; bỏ qua trường này để lấy mẫu từ mọi danh mục.
    categoryId?: string;
};

// Metadata tài liệu riêng được tạo từ mẫu hoặc cập nhật bằng file DOCX của người dùng.
export type UserDocumentSummary = {
    // ID của tài liệu riêng, khác ID của mẫu nguồn.
    id: string;
    // Tên tài liệu sau khi áp dụng tên tùy chỉnh hoặc tên mẫu mặc định.
    title: string;
    // provisioning: đang chuẩn bị; ready: có thể tải; failed: backend tạo thất bại.
    status: 'provisioning' | 'ready' | 'failed';
    // Mã lỗi từ backend nếu xử lý thất bại; null khi không có lỗi.
    failureCode: string | null;
    // Thời điểm tài liệu riêng được tạo.
    createdAt: string;
    // Thời điểm trạng thái hoặc nội dung tài liệu được cập nhật gần nhất.
    updatedAt: string;
    // URL tải chỉ có thể được cung cấp khi tài liệu đã sẵn sàng.
    downloadUrl: string | null;
    // Dấu vết mẫu và phiên bản đã dùng để tạo tài liệu này.
    sourceTemplate: {
        // ID của mẫu nguồn, khác với ID tài liệu riêng ở phía trên.
        id: string;
        // Tên mẫu dùng để giải thích nguồn tạo tài liệu.
        name: string;
        // Phiên bản mẫu đã được sao chép.
        version: number;
    };
};

// Query phân trang tài liệu riêng theo workspace; backend hỗ trợ tìm theo tiêu đề.
export type UserDocumentListQuery = {
    // Trang hiện tại, bắt đầu từ 1.
    page: number;
    // Số tài liệu tối đa được trả về trong một trang.
    limit: number;
    // Từ khóa tìm kiếm được áp dụng ở backend trên workspace hiện tại.
    search?: string;
};

// Dữ liệu GET /user-documents sau khi service bỏ envelope thành công của API.
export type PagedUserDocuments = {
    // Tài liệu thuộc trang hiện tại, đã được xếp theo thời điểm cập nhật mới nhất.
    items: UserDocumentSummary[];
    // Tổng số tài liệu khớp từ khóa trên toàn workspace.
    total: number;
    // Trang backend đã trả về.
    page: number;
    // Kích thước trang đã dùng cho truy vấn.
    limit: number;
    // Tổng số trang; bằng 0 khi workspace chưa có tài liệu.
    totalPages: number;
};

// Payload POST tạo tài liệu; title có thể bỏ trống để backend lấy tên từ mẫu nguồn.
export type CreateUserDocumentRequest = {
    // Mẫu DOCX được dùng làm nguồn sao chép.
    templateId: string;
    // Tên tùy chọn do người dùng nhập.
    title?: string;
};

// Payload PUT cập nhật nội dung; gửi File để service đóng gói thành multipart/form-data.
export type SaveUserDocumentRequest = {
    // ID tài liệu riêng đã được tạo, không phải ID mẫu nguồn.
    documentId: string;
    // File DOCX đã chỉnh sửa; backend tiếp tục xác thực MIME, định dạng và dung lượng.
    file: File;
};

// Cấu hình Docs API đã được backend ký; token chỉ sống ngắn hạn và không chứa secret.
export type OnlyOfficeEditorConfig = {
    documentType: 'word';
    type: 'desktop';
    width: '100%';
    height: '100%';
    token: string;
    document: {
        fileType: 'docx';
        key: string;
        title: string;
        url: string;
        permissions: {
            edit: true;
            download: true;
            print: true;
        };
    };
    editorConfig: {
        // Docs Server v10 lit customization.font; truyền object dù chưa có tùy biến.
        customization: Record<string, unknown>;
        callbackUrl: string;
        lang: 'vi';
        mode: 'edit';
        user: {
            id: string;
            name: string;
        };
    };
};

// URL script công khai cho browser và payload editor; API không gửi JWT secret xuống client.
export type OnlyOfficeEditorConfigResponse = {
    apiScriptUrl: string;
    config: OnlyOfficeEditorConfig;
};
