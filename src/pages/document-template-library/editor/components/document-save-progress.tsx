import { LoaderCircle } from 'lucide-react';
import powerpointIcon from '@/assets/icons/microsoft-365/powerpoint.svg';
import wordIcon from '@/assets/icons/microsoft-365/word.svg';

type DocumentSaveProgressProps = {
    fileType: 'docx' | 'pptx';
};

// Hiển thị logo đúng định dạng trong lúc ONLYOFFICE gửi callback xác nhận đã lưu.
export function DocumentSaveProgress({ fileType }: DocumentSaveProgressProps) {
    const isPresentation = fileType === 'pptx';
    const fileIcon = isPresentation ? powerpointIcon : wordIcon;

    return (
        <div
            className="absolute inset-0 z-20 grid place-items-center overflow-y-auto bg-[radial-gradient(ellipse_at_center,#eef6ff_0%,#f8fbff_48%,#fff_100%)] px-5 py-8 backdrop-blur-sm"
            role="status"
            aria-live="polite"
            aria-atomic="true"
        >
            <div className="flex w-full max-w-sm flex-col items-center rounded-3xl border border-white/95 bg-white/88 px-7 py-8 text-center shadow-[0_24px_70px_rgb(33_118_229/12%),inset_0_1px_0_rgb(255_255_255/98%)] backdrop-blur-2xl">
                <div className="relative mb-5 grid size-16 place-items-center rounded-[20px] border border-blue-100 bg-linear-to-br from-white to-blue-50 text-(--blue-deep) shadow-[0_8px_24px_rgb(33_118_229/12%)]">
                    <img
                        className="size-10 object-contain"
                        src={fileIcon}
                        alt=""
                        width="40"
                        height="40"
                    />
                    <span
                        className="absolute -right-2 -bottom-2 grid size-7 place-items-center rounded-full border-2 border-white bg-(--blue) text-white shadow-md"
                        aria-hidden="true"
                    >
                        <LoaderCircle className="size-5 animate-spin active-progress-spinner" />
                    </span>
                </div>
                <h2 className="text-balance text-lg font-semibold tracking-[-0.03em] text-(--ink)">
                    {isPresentation
                        ? 'Đang lưu bài trình chiếu'
                        : 'Đang lưu tài liệu'}
                </h2>
                <p className="mt-2 max-w-72 text-sm leading-6 text-(--muted-ink)">
                    Đang đồng bộ nội dung {fileType.toUpperCase()}. Trang sẽ tự
                    quay về thư viện khi lưu xong.
                </p>
            </div>
        </div>
    );
}
