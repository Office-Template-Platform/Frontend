// Khu vực chọn thư viện; tiêu đề, bộ đếm và các lối vào catalog được gom theo một section.
import { DocumentLibraryCard } from '@/pages/home/components/library/document-library-card';
import { PresentationLibraryCard } from '@/pages/home/components/library/presentation-library-card';

// Đưa hai thư viện DOCX và PPTX vào cùng một vùng so sánh, giữ thứ tự theo sản phẩm.
export function LibrarySelectionSection() {
    return (
        <section className="mt-px" aria-labelledby="library-title">
            <div
                className={`
                    mx-0.5 mb-4 flex items-end justify-between gap-4
                    max-[640px]:mb-3
                `}
            >
                <div>
                    <h2
                        id="library-title"
                        className={`
                            mb-1.25 text-[20px] font-[640]
                            tracking-[-0.035em] text-(--ink) text-balance
                            max-[640px]:text-[18px]
                        `}
                    >
                        Chọn thư viện
                    </h2>
                    <p
                        className={`
                            m-0 text-[12px] text-(--muted-ink)
                            max-[640px]:max-w-65
                            max-[640px]:text-[11px]
                            max-[640px]:leading-[1.55]
                        `}
                    >
                        Mẫu văn bản và bộ trình chiếu, đặt cạnh nhau.
                    </p>
                </div>
                <span
                    className={`
                        whitespace-nowrap rounded-full border
                        border-white/88 bg-white/50 px-2.5 py-1.75
                        text-[10px] font-semibold text-[#627894]
                        max-[640px]:px-2 max-[640px]:py-1.5
                        max-[640px]:text-[9px]
                    `}
                >
                    02 thư viện
                </span>
            </div>

            <div
                className={`
                    grid grid-cols-2 gap-4.75
                    max-[640px]:grid-cols-1 max-[640px]:gap-3.25
                `}
            >
                <DocumentLibraryCard />
                <PresentationLibraryCard />
            </div>
        </section>
    );
}
