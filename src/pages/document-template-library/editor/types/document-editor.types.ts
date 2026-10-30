// Khai báo kiểu cho lớp UI tích hợp ONLYOFFICE.
// Config nghiệp vụ lấy từ service; file này chỉ mô tả event, props và API global.
import type { OnlyOfficeEditorConfig } from '@/services/document-template';

// Tip ONLYOFFICE Docs API được tải lúc chạy từ Document Server local.
// Mô tả callback UI đăng ký khi khởi tạo editor.
// Các callback này đưa trạng thái tài liệu và lỗi từ DocsAPI về component.
export type OnlyOfficeEditorEventHandlers = {
    onDocumentReady: () => void;
    onDocumentStateChange: (event: { data?: boolean }) => void;
    onError: (event: { data?: { errorCode?: number } }) => void;
};

// Chỉ giữ phương thức vòng đời component cần gọi khi hủy editor.
// Không mô phỏng toàn bộ API của thư viện ONLYOFFICE bên ngoài.
export type OnlyOfficeDocumentEditorInstance = {
    destroyEditor: () => void;
};

// Hợp đồng props của component bọc DocsAPI.
// Component nhận URL/config từ backend và phát trạng thái về màn hình cha.
export type OnlyOfficeDocumentEditorProps = {
    apiScriptUrl: string;
    config: OnlyOfficeEditorConfig;
    isClosing: boolean;
    onReady: () => void;
    onChange: (hasChanges: boolean) => void;
    onError: (message: string) => void;
};

// Dữ liệu tối thiểu cho sidebar điều khiển tài liệu.
// Status điều khiển nhãn hiển thị, còn canSave quyết định nút lưu có khả dụng không.
export type DocumentEditorSidebarProps = {
    title: string;
    status: 'loading' | 'ready' | 'edited' | 'saving' | 'error';
    canSave: boolean;
    onSaveAndExit: () => void;
};

// Bổ sung kiểu cho global Window mà script ONLYOFFICE thêm vào runtime.
// API giữ optional vì script được tải bất đồng bộ và có thể chưa sẵn sàng.
declare global {
    interface Window {
        // Chỉ khai báo phần API màn hình sử dụng.
        // Caller phải kiểm tra DocsAPI tồn tại trước khi khởi tạo editor.
        DocsAPI?: {
            // Nhận phần tử DOM, config đã ký từ backend và các event handlers.
            // Trả instance để component hủy editor khi unmount.
            DocEditor: new (
                elementId: string,
                config: OnlyOfficeEditorConfig & {
                    events: OnlyOfficeEditorEventHandlers;
                },
            ) => OnlyOfficeDocumentEditorInstance;
        };
    }
}

export {};
