// Search, category chips và số kết quả đồng bộ visual với catalog DOCX.
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export type PresentationCategoryOption = {
    name: string;
    count: number;
};

type PresentationCatalogControlsProps = {
    categories: PresentationCategoryOption[];
    selectedCategory: string | null;
    searchValue: string;
    resultCount: number;
    totalCount: number;
    isFetching: boolean;
    onCategoryChange: (category: string | null) => void;
    onSearchChange: (search: string) => void;
};

// Thu hẹp danh sách theo tên, mô tả hoặc danh mục trong bộ dữ liệu đã tải về.
export function PresentationCatalogControls({
    categories,
    selectedCategory,
    searchValue,
    resultCount,
    totalCount,
    isFetching,
    onCategoryChange,
    onSearchChange,
}: PresentationCatalogControlsProps) {
    return (
        <section
            className="glass-panel space-y-4 rounded-[24px] p-4 sm:p-5"
            aria-label="Tìm kiếm và lọc mẫu trình chiếu"
        >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <label className="relative block min-w-0 flex-1">
                    <Search
                        className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400"
                        aria-hidden="true"
                    />
                    <Input
                        type="search"
                        value={searchValue}
                        onChange={(event) => onSearchChange(event.target.value)}
                        placeholder="Tìm theo tên hoặc mô tả mẫu..."
                        aria-label="Tìm mẫu trình chiếu"
                        className="h-11 rounded-[15px] border-white/90 bg-white/70 pl-10 text-sm text-(--ink) shadow-inner shadow-blue-950/[0.025] placeholder:text-slate-400 focus-visible:border-blue-300 focus-visible:ring-blue-200/60"
                    />
                </label>
                <div
                    className="flex min-h-11 items-center justify-between gap-3 rounded-[15px] border border-white/80 bg-white/55 px-3.5 sm:min-w-36 sm:justify-center"
                    aria-live="polite"
                >
                    <span className="text-xs font-medium text-(--muted-ink)">
                        {isFetching ? 'Đang cập nhật' : 'Mẫu phù hợp'}
                    </span>
                    <span className="text-sm font-semibold tabular-nums text-(--ink)">
                        {resultCount}
                    </span>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 text-xs font-semibold text-(--muted-ink)">
                    Danh mục
                </span>
                <Button
                    type="button"
                    size="sm"
                    variant={selectedCategory === null ? 'default' : 'outline'}
                    aria-pressed={selectedCategory === null}
                    onClick={() => onCategoryChange(null)}
                    className="h-8 rounded-full px-3"
                >
                    Tất cả
                    <span className="ml-1 tabular-nums opacity-75">
                        {totalCount}
                    </span>
                </Button>
                {categories.map((category) => (
                    <Button
                        key={category.name}
                        type="button"
                        size="sm"
                        variant={
                            selectedCategory === category.name
                                ? 'default'
                                : 'outline'
                        }
                        aria-pressed={selectedCategory === category.name}
                        onClick={() => onCategoryChange(category.name)}
                        className="h-8 rounded-full px-3"
                    >
                        {category.name}
                        <span className="ml-1 tabular-nums opacity-75">
                            {category.count}
                        </span>
                    </Button>
                ))}
            </div>
        </section>
    );
}
