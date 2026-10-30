import { FileText, LoaderCircle } from 'lucide-react';

// Trấn an người dùng trong lúc ONLYOFFICE gửi callback xác nhận bản DOCX đã lưu.
export function DocumentSaveProgress() {
    return (
        <div
            className="absolute inset-0 z-20 grid place-items-center overflow-y-auto bg-[radial-gradient(ellipse_at_center,#eef6ff_0%,#f8fbff_48%,#fff_100%)] px-5 py-8 backdrop-blur-sm"
            role="status"
            aria-live="polite"
            aria-atomic="true"
        >
            <div className="flex w-full max-w-sm flex-col items-center rounded-3xl border border-white/95 bg-white/88 px-7 py-8 text-center shadow-[0_24px_70px_rgb(33_118_229/12%),inset_0_1px_0_rgb(255_255_255/98%)] backdrop-blur-2xl">
                <div className="relative mb-5 grid size-16 place-items-center rounded-[20px] border border-blue-100 bg-linear-to-br from-white to-blue-50 text-(--blue-deep) shadow-[0_8px_24px_rgb(33_118_229/12%)]">
                    <FileText
                        className="size-7"
                        strokeWidth={1.8}
                        aria-hidden="true"
                    />
                    <span
                        className="absolute -right-2 -bottom-2 grid size-7 place-items-center rounded-full border-2 border-white bg-(--blue) text-white shadow-md"
                        aria-hidden="true"
                    >
                        <LoaderCircle className="size-5 animate-spin active-progress-spinner" />
                    </span>
                </div>
                <h2 className="text-balance text-lg font-semibold tracking-[-0.03em] text-(--ink)">
                    Đang lưu tài liệu
                </h2>
                <p className="mt-2 max-w-72 text-sm leading-6 text-(--muted-ink)">
                    Đang đồng bộ nội dung DOCX. Trang sẽ tự quay về thư viện khi
                    lưu xong.
                </p>
            </div>
        </div>
    );
}
