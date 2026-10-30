// Sidebar DOCX dùng rail kính trên desktop và chuyển thành thanh ngang trên mobile.
import {
    ArrowLeft,
    Check,
    CircleAlert,
    FileText,
    LoaderCircle,
    PencilLine,
    Save,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { DocumentEditorSidebarProps } from '@/pages/document-template-library/editor/types/document-editor.types';

// Mở rộng sidebar trong luồng flex để vùng Word dịch chuyển theo, không bị card phủ lên.
const editorSidebarClassName = [
    'glass-panel group/editor-sidebar z-20 flex h-12 shrink-0 items-center justify-between gap-2 border-b border-slate-200 bg-white px-3 text-slate-900',
    'sm:px-5 lg:my-3 lg:ml-3 lg:h-[calc(100dvh-24px)] lg:w-18 lg:shrink-0 lg:flex-col lg:items-stretch lg:gap-0 lg:overflow-hidden lg:rounded-[24px] lg:border lg:border-white/85 lg:bg-linear-to-br lg:from-white/80 lg:via-sky-50/65 lg:to-blue-100/45 lg:px-3 lg:pt-3.5 lg:pb-3 lg:shadow-[0_18px_48px_rgb(45_92_148/14%),inset_0_1px_0_rgb(255_255_255/96%)] lg:backdrop-blur-2xl',
    'lg:transition-[width,box-shadow,border-radius] lg:duration-1000 lg:ease-in-out lg:hover:w-64 lg:hover:rounded-[28px] lg:hover:shadow-[0_22px_56px_rgb(45_92_148/18%),inset_0_1px_0_rgb(255_255_255/98%)] lg:focus-within:w-64 lg:focus-within:rounded-[28px] lg:focus-within:shadow-[0_22px_56px_rgb(45_92_148/18%),inset_0_1px_0_rgb(255_255_255/98%)] lg:motion-reduce:transition-[width,box-shadow,border-radius] lg:motion-reduce:duration-1000',
].join(' ');

// Đặt nhãn tuyệt đối để vị trí các icon không đổi khi sidebar mở rộng.
const desktopRevealClassName = [
    'absolute top-1/2 -translate-y-1/2 overflow-hidden whitespace-nowrap',
].join(' ');

// Trì hoãn nhãn 400 ms trước khi fade vào; khi rời chuột, bắt đầu ẩn ngay để kịp trước khi rail co.
const desktopRevealVisibilityClassName = [
    'invisible opacity-0 transition-[opacity,visibility] duration-200 delay-0',
    'lg:group-hover/editor-sidebar:visible lg:group-hover/editor-sidebar:opacity-100 lg:group-hover/editor-sidebar:delay-400',
    'lg:group-focus-within/editor-sidebar:visible lg:group-focus-within/editor-sidebar:opacity-100 lg:group-focus-within/editor-sidebar:delay-400',
].join(' ');

// Dùng sắc thái theo trạng thái; rail thu gọn ẩn badge hoàn toàn, không dùng chấm trạng thái.
const statusBadgeClasses = {
    error: 'border-red-200 bg-red-50 text-red-700',
    edited: 'border-blue-200 bg-blue-50 text-blue-700',
    busy: 'border-sky-200 bg-sky-50 text-sky-700',
    ready: 'border-emerald-200 bg-emerald-50 text-emerald-700',
} as const;

// Hiển thị trạng thái DOCX và giữ nguyên callback lưu/quay lại do trang cha cung cấp.
export function DocumentEditorSidebar({
    title,
    status,
    canSave,
    onSaveAndExit,
}: DocumentEditorSidebarProps) {
    const statusClassName =
        status === 'error'
            ? statusBadgeClasses.error
            : status === 'edited'
              ? statusBadgeClasses.edited
              : status === 'loading' || status === 'saving'
                ? statusBadgeClasses.busy
                : statusBadgeClasses.ready;
    const isUnavailable = !canSave && status !== 'saving';
    const saveActionLabel = isUnavailable
        ? 'Về thư viện'
        : status === 'saving'
          ? 'Đang lưu…'
          : 'Lưu & thoát';
    const StatusIcon =
        status === 'ready'
            ? Check
            : status === 'edited'
              ? PencilLine
              : status === 'error'
                ? CircleAlert
                : LoaderCircle;
    const isStatusBusy = status === 'loading' || status === 'saving';

    return (
        <header className={editorSidebarClassName}>
            <div className="flex min-w-0 flex-1 items-center justify-between gap-2 lg:hidden">
                <div className="flex min-w-0 items-center gap-2.5">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label={
                            isUnavailable
                                ? 'Về thư viện văn bản'
                                : 'Lưu thay đổi và quay lại thư viện văn bản'
                        }
                        onClick={onSaveAndExit}
                        className="size-8 shrink-0 rounded-md text-slate-500 hover:bg-blue-50 hover:text-blue-700"
                    >
                        <ArrowLeft aria-hidden="true" />
                    </Button>
                    <span
                        className="h-4 w-px shrink-0 bg-slate-200"
                        aria-hidden="true"
                    />
                    <div className="flex min-w-0 items-center gap-2.5">
                        <h1 className="min-w-0 truncate text-sm font-semibold tracking-tight text-slate-900">
                            {title}
                        </h1>
                        <span
                            className={`inline-flex h-6 shrink-0 items-center rounded-full border px-2 text-[11px] font-medium leading-none ${statusClassName}`}
                            aria-live="polite"
                        >
                            {status === 'loading' && 'Đang kết nối…'}
                            {status === 'ready' && 'Đã đồng bộ'}
                            {status === 'edited' && 'Có thay đổi'}
                            {status === 'saving' && 'Đang lưu…'}
                            {status === 'error' && 'Editor gặp lỗi'}
                        </span>
                    </div>
                </div>
                <Button
                    type="button"
                    onClick={onSaveAndExit}
                    disabled={!canSave && !isUnavailable}
                    className="h-8 shrink-0 gap-1.5 rounded-lg bg-blue-600 px-3 text-sm font-semibold text-white shadow-sm shadow-blue-950/30 hover:bg-blue-500 disabled:bg-blue-400 disabled:opacity-100 disabled:shadow-none"
                >
                    {status === 'saving' ? (
                        <LoaderCircle
                            className="size-4 animate-spin active-progress-spinner"
                            aria-hidden="true"
                        />
                    ) : isUnavailable ? (
                        <ArrowLeft className="size-4" aria-hidden="true" />
                    ) : (
                        <Save className="size-4" aria-hidden="true" />
                    )}
                    {saveActionLabel}
                </Button>
            </div>

            <div className="hidden h-full min-h-0 w-full flex-col lg:flex">
                <span className="sr-only" aria-live="polite">
                    {status === 'loading' && 'Đang kết nối…'}
                    {status === 'ready' && 'Đã đồng bộ'}
                    {status === 'edited' && 'Có thay đổi'}
                    {status === 'saving' && 'Đang lưu…'}
                    {status === 'error' && 'Editor gặp lỗi'}
                </span>
                <div className="grid gap-4">
                    <Button
                        type="button"
                        variant="ghost"
                        aria-label={
                            isUnavailable
                                ? 'Về thư viện văn bản'
                                : 'Lưu thay đổi và quay lại thư viện văn bản'
                        }
                        title="Về thư viện văn bản"
                        onClick={onSaveAndExit}
                        className="relative h-11 w-full justify-start rounded-[15px] border border-white/80 bg-white/55 px-0 text-slate-600 shadow-[inset_0_1px_0_rgb(255_255_255/95%)] transition-colors hover:bg-white/85 hover:text-blue-700"
                    >
                        <ArrowLeft
                            className="absolute left-3 size-5 shrink-0"
                            aria-hidden="true"
                        />
                        <span
                            className={`${desktopRevealClassName} ${desktopRevealVisibilityClassName} left-8 right-24 text-sm font-medium`}
                        >
                            Thư viện
                        </span>
                        <span
                            className={`${desktopRevealClassName} ${desktopRevealVisibilityClassName} right-2.5 inline-flex h-7 items-center gap-1.5 rounded-full border px-2.5 text-[10px] font-semibold leading-none shadow-[inset_0_1px_0_rgb(255_255_255/90%)] ${statusClassName}`}
                        >
                            <StatusIcon
                                className={`size-3.5 shrink-0 ${isStatusBusy ? 'animate-spin active-progress-spinner' : ''}`}
                                aria-hidden="true"
                            />
                            {status === 'loading' && 'Đang kết nối…'}
                            {status === 'ready' && 'Đã đồng bộ'}
                            {status === 'edited' && 'Có thay đổi'}
                            {status === 'saving' && 'Đang lưu…'}
                            {status === 'error' && 'Editor gặp lỗi'}
                        </span>
                    </Button>

                    <div className="relative h-11 w-full">
                        <span
                            className="absolute top-0 left-0 grid size-11 shrink-0 place-items-center rounded-[15px] border border-white/85 bg-white/65 text-blue-600 shadow-[inset_0_1px_0_rgb(255_255_255/95%),0_6px_18px_rgb(50_105_174/8%)]"
                            aria-hidden="true"
                        >
                            <FileText className="size-5" strokeWidth={1.8} />
                        </span>
                        <div
                            className={`absolute top-1/2 right-0 left-14 -translate-y-1/2 overflow-hidden ${desktopRevealVisibilityClassName}`}
                        >
                            <h1 className="line-clamp-2 min-w-0 text-sm font-semibold tracking-tight text-slate-900">
                                {title}
                            </h1>
                        </div>
                    </div>
                </div>

                <Button
                    type="button"
                    aria-label={
                        isUnavailable
                            ? 'Về thư viện văn bản'
                            : status === 'saving'
                              ? 'Đang lưu và thoát'
                              : 'Lưu và thoát'
                    }
                    onClick={onSaveAndExit}
                    disabled={!canSave && !isUnavailable}
                    className="relative mt-auto h-11 w-full justify-start rounded-[15px] border border-blue-400/45 bg-blue-600 px-0 text-white shadow-[0_10px_24px_rgb(37_99_235/25%),inset_0_1px_0_rgb(255_255_255/24%)] transition-[background-color,box-shadow] hover:bg-blue-500 hover:shadow-[0_14px_30px_rgb(37_99_235/34%),inset_0_1px_0_rgb(255_255_255/28%)] disabled:border-blue-300 disabled:bg-blue-400 disabled:opacity-100 disabled:shadow-none"
                >
                    {status === 'saving' ? (
                        <LoaderCircle
                            className="absolute left-3 size-5 animate-spin active-progress-spinner"
                            aria-hidden="true"
                        />
                    ) : isUnavailable ? (
                        <ArrowLeft
                            className="absolute left-3.5 size-4"
                            aria-hidden="true"
                        />
                    ) : (
                        <Save
                            className="absolute left-3.5 size-4"
                            aria-hidden="true"
                        />
                    )}
                    <span
                        className={`${desktopRevealClassName} ${desktopRevealVisibilityClassName} left-1/2 w-max -translate-x-1/2 text-center text-sm font-semibold`}
                    >
                        {saveActionLabel}
                    </span>
                </Button>
            </div>
        </header>
    );
}
