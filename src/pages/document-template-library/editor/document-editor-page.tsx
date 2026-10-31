// Page sửa DOCX/PPTX trong ONLYOFFICE; route riêng để editor có toàn bộ chiều cao cửa sổ.
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, LoaderCircle, TriangleAlert } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { getApiErrorMessage } from '@/shared/api/get-api-error-message';
import { ROUTE_PATHS } from '@/shared/config/route-paths';
import {
    useGetUserDocumentEditorConfigQuery,
    useGetUserDocumentQuery,
} from '@/services/document-template';
import { DocumentEditorSidebar } from '@/pages/document-template-library/editor/components/document-editor-sidebar';
import { DocumentSaveProgress } from '@/pages/document-template-library/editor/components/document-save-progress';
import { OnlyOfficeDocumentEditor } from '@/pages/document-template-library/editor/components/onlyoffice-document-editor';

// Dựng sidebar trên desktop/mobile; khi lưu, chờ callback cập nhật revision rồi về danh sách file cá nhân.
export function DocumentEditorPage() {
    const { documentId } = useParams();
    const navigate = useNavigate();
    const [isEditorReady, setIsEditorReady] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [isWaitingForSave, setIsWaitingForSave] = useState(false);
    const [editorError, setEditorError] = useState<string | null>(null);
    const initialUpdatedAt = useRef<string | null>(null);
    const safeDocumentId = documentId ?? '';
    const {
        data: document,
        error: documentError,
        isLoading: isDocumentLoading,
    } = useGetUserDocumentQuery(safeDocumentId, {
        skip: !documentId,
        pollingInterval: isWaitingForSave ? 1000 : 0,
        refetchOnMountOrArgChange: true,
    });
    const {
        data: editorConfig,
        error: editorConfigError,
        isLoading: isConfigLoading,
    } = useGetUserDocumentEditorConfigQuery(safeDocumentId, {
        // Đợi metadata cấp workspace cookie xong; chạy hai query song song lần đầu có thể tạo hai workspace khác nhau.
        skip: !documentId || isDocumentLoading || !document,
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        // Chụp revision lúc mở editor; callback thành công sẽ làm `updatedAt` khác giá trị này.
        if (document && initialUpdatedAt.current === null) {
            initialUpdatedAt.current = document.updatedAt;
        }
    }, [document]);

    useEffect(() => {
        if (!hasChanges || isWaitingForSave) {
            return;
        }

        // Chặn đóng/reload tab khi editor còn thay đổi; nút lưu riêng sẽ đóng phiên có kiểm soát.
        function warnBeforeUnload(event: BeforeUnloadEvent): void {
            event.preventDefault();
            event.returnValue = '';
        }

        window.addEventListener('beforeunload', warnBeforeUnload);
        return () =>
            window.removeEventListener('beforeunload', warnBeforeUnload);
    }, [hasChanges, isWaitingForSave]);

    useEffect(() => {
        if (!isWaitingForSave) {
            return;
        }

        // Docs Server thường gửi callback sau khi đóng editor; hết thời gian vẫn cho phép quay lại.
        const timeoutId = window.setTimeout(() => {
            toast.warning(
                'Chưa nhận được xác nhận lưu. Hãy kiểm tra lại file trong tài liệu của tôi.',
            );
            navigate(ROUTE_PATHS.userDocuments, { replace: true });
        }, 15_000);

        return () => window.clearTimeout(timeoutId);
    }, [isWaitingForSave, navigate]);

    useEffect(() => {
        if (
            !isWaitingForSave ||
            !document ||
            !initialUpdatedAt.current ||
            document.updatedAt === initialUpdatedAt.current
        ) {
            return;
        }

        // Chỉ báo lưu thành công khi metadata từ API phản ánh object revision vừa được thay thế.
        const fileType = editorConfig?.config.document.fileType ?? 'docx';
        toast.success(
            `Đã lưu nội dung ${fileType.toUpperCase()} đã chỉnh sửa.`,
        );
        navigate(ROUTE_PATHS.userDocuments, { replace: true });
    }, [document, editorConfig, isWaitingForSave, navigate]);

    // Cho phép rời trang khi tài liệu lỗi; nếu có thay đổi thì đóng iframe để ONLYOFFICE gửi callback status 2.
    function handleSaveAndExit(): void {
        if (isWaitingForSave || !documentId) {
            return;
        }

        // Khi tải tài liệu lỗi, vẫn giữ lối về danh sách file cá nhân.
        if (!document) {
            navigate(ROUTE_PATHS.userDocuments);
            return;
        }

        if (!hasChanges) {
            navigate(ROUTE_PATHS.userDocuments);
            return;
        }

        setIsWaitingForSave(true);
    }

    // Giữ callback ổn định để DocsAPI không bị destroy/recreate khi React cập nhật trạng thái.
    const handleEditorReady = useCallback(() => {
        setIsEditorReady(true);
    }, []);

    // Chỉ giữ trạng thái dirty=true: false chỉ báo Docs Server đã nhận batch, chưa lưu file về ứng dụng.
    const handleEditorChange = useCallback((changed: boolean) => {
        if (changed) {
            setHasChanges(true);
        }
    }, []);

    // Hiển thị lỗi tải/lưu từ iframe ngay tại page và vẫn giữ nút quay lại cho người dùng.
    const handleEditorError = useCallback((message: string) => {
        setEditorError(message);
        toast.error(message);
    }, []);

    const requestError = documentError ?? editorConfigError;
    const headerStatus = isWaitingForSave
        ? 'saving'
        : editorError || requestError
          ? 'error'
          : !isEditorReady
            ? 'loading'
            : hasChanges
              ? 'edited'
              : 'ready';

    return (
        <>
            <a
                href="#main-content"
                className="sr-only z-50 rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus-visible:ring-2 focus-visible:ring-blue-500"
            >
                Đến vùng soạn thảo
            </a>
            <main
                id="main-content"
                className="relative flex h-dvh min-h-0 flex-col overflow-hidden bg-slate-100 pt-[env(safe-area-inset-top)] text-slate-900 lg:flex-row lg:bg-transparent lg:pt-0"
            >
                <DocumentEditorSidebar
                    title={document?.title ?? 'Đang mở tài liệu…'}
                    fileType={editorConfig?.config.document.fileType ?? 'docx'}
                    status={headerStatus}
                    canSave={Boolean(document) && !isWaitingForSave}
                    onSaveAndExit={handleSaveAndExit}
                />
                <section className="flex min-h-0 min-w-0 flex-1 bg-slate-200 p-2 sm:p-4 lg:ml-3 lg:bg-transparent lg:py-3 lg:pr-3 lg:pl-2">
                    <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-300/70 sm:rounded-2xl">
                        {isDocumentLoading || isConfigLoading ? (
                            <div className="flex h-full min-h-[480px] flex-col items-center justify-center gap-3 text-sm text-slate-600">
                                <LoaderCircle
                                    className="size-6 animate-spin text-blue-600 motion-reduce:animate-none"
                                    aria-hidden="true"
                                />
                                Đang chuẩn bị tài liệu…
                            </div>
                        ) : requestError || !editorConfig ? (
                            <div className="flex h-full min-h-[480px] flex-col items-center justify-center gap-4 px-5 text-center">
                                <span className="flex size-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                                    <TriangleAlert
                                        className="size-5"
                                        aria-hidden="true"
                                    />
                                </span>
                                <div className="max-w-lg">
                                    <h2 className="text-pretty text-lg font-semibold text-slate-900">
                                        Không mở được tài liệu
                                    </h2>
                                    <p className="mt-1.5 text-sm leading-6 text-slate-600">
                                        {getApiErrorMessage(
                                            requestError,
                                            'Không tải được cấu hình ONLYOFFICE. Hãy kiểm tra API và Docs Server.',
                                        )}
                                    </p>
                                </div>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="rounded-xl bg-white"
                                >
                                    <Link to={ROUTE_PATHS.userDocuments}>
                                        <ArrowLeft aria-hidden="true" />
                                        Về tài liệu của tôi
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <>
                                <OnlyOfficeDocumentEditor
                                    apiScriptUrl={editorConfig.apiScriptUrl}
                                    config={editorConfig.config}
                                    isClosing={isWaitingForSave}
                                    onReady={handleEditorReady}
                                    onChange={handleEditorChange}
                                    onError={handleEditorError}
                                />
                                {isWaitingForSave && (
                                    <DocumentSaveProgress
                                        fileType={
                                            editorConfig?.config.document
                                                .fileType ?? 'docx'
                                        }
                                    />
                                )}
                                {editorError && (
                                    <div
                                        className="absolute inset-x-4 bottom-4 z-30 mx-auto max-w-xl rounded-xl border border-red-200 bg-white p-3 text-sm text-red-700 shadow-lg"
                                        role="alert"
                                    >
                                        {editorError}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}
