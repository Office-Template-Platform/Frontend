// Khung tải giúp giữ nhịp lưới và hạn chế layout shift khi API trả danh sách DOCX.
import { Skeleton } from '@/components/ui/skeleton';

// Dựng sáu card cùng tỷ lệ với kết quả thật để trang không nhảy khi dữ liệu đến.
export function DocumentCatalogSkeleton() {
    return (
        <div
            className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3"
            aria-label="Đang tải mẫu văn bản"
            aria-busy="true"
        >
            {Array.from({ length: 6 }, (_, index) => (
                <div
                    key={index}
                    className="glass-panel rounded-[25px] p-3.5 sm:p-4"
                >
                    <Skeleton className="aspect-[4/3] rounded-[19px] bg-blue-100/65" />
                    <div className="space-y-3 px-1 pt-4">
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-10 w-full" />
                        <div className="flex gap-2.5 pt-1">
                            <Skeleton className="h-10 flex-1 rounded-[13px]" />
                            <Skeleton className="h-10 flex-1 rounded-[13px]" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
