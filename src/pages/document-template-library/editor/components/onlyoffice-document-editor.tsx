// Vòng đời DocsAPI ở component riêng; region báo bận khi iframe đóng để chờ xác nhận lưu.
import { useEffect, useId, useRef } from 'react';
import type {
    OnlyOfficeDocumentEditorInstance,
    OnlyOfficeDocumentEditorProps,
} from '@/pages/document-template-library/editor/types/document-editor.types';

let docsApiScriptPromise: Promise<void> | null = null;

// Chỉ tải một script DocsAPI dùng chung; lỗi tải được xóa cache để người dùng thử lại.
function loadDocsApiScript(scriptUrl: string): Promise<void> {
    if (window.DocsAPI?.DocEditor) {
        return Promise.resolve();
    }

    if (docsApiScriptPromise) {
        return docsApiScriptPromise;
    }

    docsApiScriptPromise = new Promise<void>((resolve, reject) => {
        const existingScript = document.querySelector<HTMLScriptElement>(
            'script[data-onlyoffice-docs-api="true"]',
        );
        const script = existingScript ?? document.createElement('script');
        const handleLoad = () => {
            if (window.DocsAPI?.DocEditor) {
                resolve();
            } else {
                reject(new Error('DocsAPI không khởi tạo được.'));
            }
        };
        const handleError = () => reject(new Error('Không tải được DocsAPI.'));

        script.addEventListener('load', handleLoad, { once: true });
        script.addEventListener('error', handleError, { once: true });
        if (!existingScript) {
            script.src = scriptUrl;
            script.async = true;
            script.dataset.onlyofficeDocsApi = 'true';
            document.head.append(script);
        }
    }).catch((error: unknown) => {
        docsApiScriptPromise = null;
        throw error;
    });

    return docsApiScriptPromise;
}

// Khởi tạo một instance DocsAPI, báo thay đổi cho thanh trạng thái và hủy iframe khi rời trang.
export function OnlyOfficeDocumentEditor({
    apiScriptUrl,
    config,
    isClosing,
    onReady,
    onChange,
    onError,
}: OnlyOfficeDocumentEditorProps) {
    const generatedId = useId();
    const elementId = `onlyoffice-editor-${generatedId.replaceAll(':', '')}`;
    const editorRef = useRef<OnlyOfficeDocumentEditorInstance | null>(null);

    useEffect(() => {
        if (isClosing && editorRef.current) {
            editorRef.current.destroyEditor();
            editorRef.current = null;
        }
    }, [isClosing]);

    useEffect(() => {
        let isMounted = true;

        // Chờ DocsAPI trước khi tạo iframe; cleanup ngăn khởi tạo muộn sau khi người dùng rời route.
        void loadDocsApiScript(apiScriptUrl)
            .then(() => {
                if (!isMounted || !window.DocsAPI?.DocEditor) {
                    return;
                }

                // RTK Query đóng băng response lồng nhau; DocsAPI cần sửa document.token trong config.
                const mutableConfig = structuredClone(config);

                editorRef.current = new window.DocsAPI.DocEditor(elementId, {
                    ...mutableConfig,
                    events: {
                        onDocumentReady: () => {
                            if (isMounted) onReady();
                        },
                        onDocumentStateChange: (event) => {
                            if (isMounted && typeof event.data === 'boolean') {
                                onChange(event.data);
                            }
                        },
                        onError: () => {
                            if (isMounted) {
                                onError(
                                    'ONLYOFFICE không thể mở hoặc lưu tài liệu này.',
                                );
                            }
                        },
                    },
                });
            })
            .catch(() => {
                if (isMounted) {
                    onError(
                        'Không tải được ONLYOFFICE Docs. Hãy kiểm tra Docs Server đang chạy.',
                    );
                }
            });

        return () => {
            isMounted = false;
            if (editorRef.current) {
                editorRef.current.destroyEditor();
                editorRef.current = null;
            }
        };
    }, [apiScriptUrl, config, elementId, onChange, onError, onReady]);

    return (
        <div
            role="region"
            aria-label="Trình soạn thảo DOCX"
            aria-busy={isClosing}
            className="h-full min-h-[480px] w-full"
        >
            <div id={elementId} className="h-full w-full" />
        </div>
    );
}
