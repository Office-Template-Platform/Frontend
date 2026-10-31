// Ranh giới props cho trang tài liệu riêng; hợp đồng dữ liệu vẫn thuộc service DOCX.
import type { UserDocumentSummary } from '@/services/document-template';

// Điều khiển ô tìm kiếm và trạng thái làm mới mà không để component gọi API trực tiếp.
export type UserDocumentsToolbarProps = {
    searchValue: string;
    isFetching: boolean;
    total?: number;
    onSearchChange: (value: string) => void;
    onClearSearch: () => void;
};

// Chia trang hiện tại thành tài liệu vừa cập nhật và các mục còn lại.
export type UserDocumentsCollectionProps = {
    recentDocument: UserDocumentSummary | null;
    documents: UserDocumentSummary[];
    isDeleting: boolean;
    onDelete: (document: UserDocumentSummary) => void;
};

// Một dòng trong danh sách dùng cùng thông tin và hành động với mục nổi bật.
export type UserDocumentRowProps = {
    document: UserDocumentSummary;
    featured?: boolean;
    isDeleting: boolean;
    onDelete: (document: UserDocumentSummary) => void;
};

// Trạng thái gọn dùng lại trong vùng nổi bật và từng dòng của danh sách.
export type UserDocumentStatusBadgeProps = {
    status: UserDocumentSummary['status'];
};

// Trạng thái rỗng phân biệt workspace mới với tìm kiếm không có kết quả.
export type UserDocumentsEmptyStateProps = {
    hasSearch: boolean;
    onClearSearch: () => void;
};

// Giữ lỗi truy vấn và thao tác thử lại trong cùng bề mặt nội dung.
export type UserDocumentsErrorStateProps = {
    error: unknown;
    onRetry: () => void;
};

// Phân trang chỉ nhận metadata do backend trả về và callback đổi trang.
export type UserDocumentsPaginationProps = {
    page: number;
    totalPages: number;
    total: number;
    onPageChange: (page: number) => void;
};
