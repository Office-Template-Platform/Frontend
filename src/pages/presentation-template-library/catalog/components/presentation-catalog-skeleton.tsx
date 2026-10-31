// Skeleton dùng cùng lưới, tỷ lệ 4:3 và nhịp nội dung với card DOCX.
import { Skeleton } from '@/components/ui/skeleton';

// Dựng sáu card giống catalog thật để vùng nội dung không co lại khi đang tải.
export function PresentationCatalogSkeleton() {
    return (
        <div
            className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3"
            role="status"
            aria-label="Đang tải bộ mẫu trình chiếu"
            aria-busy="true"
        >
            {Array.from({ length: 6 }, (_, index) => (
                <article
                    key={index}
                    className="glass-panel flex min-w-0 flex-col rounded-[25px] p-3.5 sm:p-4"
                    aria-hidden="true"
                >
                    <div className="relative flex aspect-[4/3] min-h-64 w-full items-center justify-center overflow-hidden rounded-[19px] border border-white/90 bg-gradient-to-br from-blue-100/75 via-sky-50 to-white/80">
                        <Skeleton className="absolute top-3 left-3 h-7 w-16 rounded-full border border-white/90 bg-white/90 shadow-sm" />
                        <div className="relative flex aspect-video w-[88%] flex-col rounded-[14px] border border-white/95 bg-white/90 p-4 shadow-[0_15px_32px_rgba(33,75,126,0.14)]">
                            <Skeleton className="h-2 w-1/3 bg-blue-100/90" />
                            <Skeleton className="mt-3 h-4 w-2/3 bg-slate-100" />
                            <Skeleton className="mt-2 h-2 w-4/5 bg-slate-100" />
                            <Skeleton className="mt-1.5 h-2 w-3/5 bg-slate-100" />
                            <Skeleton className="mt-auto h-8 w-2/5 rounded-lg bg-blue-50" />
                        </div>
                        <Skeleton className="absolute right-3 bottom-3 size-9 rounded-full border border-white/90 bg-white/90 shadow-sm" />
                    </div>
                    <div className="flex flex-1 flex-col px-1 pt-4">
                        <div className="mb-2 flex min-h-6 items-center gap-2">
                            <Skeleton className="h-6 w-24 rounded-full bg-blue-100/80" />
                            <Skeleton className="h-6 w-20 rounded-full bg-slate-100" />
                        </div>
                        <Skeleton className="h-6 w-3/5 bg-slate-200/90" />
                        <div className="mt-1.5 space-y-1">
                            <Skeleton className="h-5 w-full bg-slate-100" />
                            <Skeleton className="h-5 w-4/5 bg-slate-100" />
                        </div>
                        <div className="mt-auto pt-4">
                            <Skeleton className="h-10 w-full rounded-[13px] bg-white/90" />
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
}
