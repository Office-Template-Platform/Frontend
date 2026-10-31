// Phần đầu trang thùng rác gồm tìm kiếm, tổng số và giải thích cách khôi phục.
import type { ChangeEvent } from 'react';
import {
    FolderOpen,
    Info,
    LoaderCircle,
    Search,
    Trash2,
    X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ROUTE_PATHS } from '@/shared/config/route-paths';

type TrashDocumentsHeaderProps = {
    searchValue: string;
    isFetching: boolean;
    total?: number;
    onSearchChange: (value: string) => void;
    onClearSearch: () => void;
};

const documentCountFormatter = new Intl.NumberFormat('vi-VN');

// Hiển thị trạng thái truy vấn và chuyển thay đổi input cho hook debounce đang dùng ở page.
export function TrashDocumentsHeader({
    searchValue,
    isFetching,
    total,
    onSearchChange,
    onClearSearch,
}: TrashDocumentsHeaderProps) {
    // Chỉ đổi input cục bộ; hook trì hoãn request để không gọi API theo từng phím.
    function handleSearchInput(event: ChangeEvent<HTMLInputElement>): void {
        onSearchChange(event.currentTarget.value);
    }

    return (
        <section className="mb-5 flex flex-col gap-4.5 sm:mb-6">
            <div className="relative overflow-hidden rounded-[26px] border border-white/90 bg-[linear-gradient(118deg,rgba(255,255,255,0.93),rgba(237,246,255,0.9)_60%,rgba(226,239,255,0.84))] p-4 shadow-[0_16px_42px_rgb(52_101_157/7%),inset_0_1px_0_rgb(255_255_255/98%)] sm:p-5">
                <span
                    className="pointer-events-none absolute -top-16 -right-12 size-52 rounded-full bg-blue-200/30 blur-3xl"
                    aria-hidden="true"
                />
                <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-3.5">
                        <span className="grid size-12 shrink-0 place-items-center rounded-[17px] border border-white/95 bg-white/85 text-blue-700 shadow-[0_8px_24px_rgb(33_118_229/11%)] sm:size-14 sm:rounded-[19px]">
                            <Trash2
                                className="size-5.5 sm:size-6"
                                aria-hidden="true"
                            />
                        </span>
                        <div className="min-w-0">
                            <h1 className="text-[25px] font-semibold tracking-[-0.045em] text-(--ink) sm:text-[30px]">
                                Thùng rác
                            </h1>
                            <p className="mt-1 max-w-2xl text-sm leading-5.5 text-(--muted-ink)">
                                Tài liệu bạn đã xóa được giữ tại đây để có thể
                                khôi phục bất cứ lúc nào.
                            </p>
                        </div>
                    </div>
                    <Button
                        asChild
                        type="button"
                        variant="outline"
                        className="h-10 shrink-0 rounded-[13px] border-blue-100 bg-white/80 px-3.5 text-blue-800 hover:bg-white"
                    >
                        <Link to={ROUTE_PATHS.userDocuments}>
                            <FolderOpen aria-hidden="true" />
                            Tài liệu của tôi
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
                <div className="relative min-w-0 flex-1">
                    <Search
                        className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-slate-400"
                        aria-hidden="true"
                    />
                    <Input
                        id="trash-documents-search"
                        name="search"
                        type="search"
                        autoComplete="off"
                        value={searchValue}
                        onChange={handleSearchInput}
                        placeholder="Tìm trong thùng rác…"
                        aria-label="Tìm tài liệu trong thùng rác"
                        className="h-12 appearance-none rounded-[16px] border-white/90 bg-white/72 pr-11 pl-11 text-sm shadow-[0_5px_18px_rgb(51_91_139/5%)] placeholder:text-slate-400 focus-visible:border-blue-200 focus-visible:ring-blue-200/60 [&::-webkit-search-cancel-button]:appearance-none"
                    />
                    {searchValue && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute top-1/2 right-2 size-8 -translate-y-1/2 rounded-full text-slate-400 hover:bg-blue-50 hover:text-blue-700"
                            aria-label="Xóa nội dung tìm kiếm"
                            onClick={onClearSearch}
                        >
                            <X aria-hidden="true" />
                        </Button>
                    )}
                </div>
                <span className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-[16px] border border-white/90 bg-white/65 px-4 text-xs text-(--muted-ink) shadow-[inset_0_1px_0_rgb(255_255_255/95%)] sm:min-w-32">
                    {isFetching ? (
                        <LoaderCircle
                            className="size-3.5 animate-spin text-blue-600 motion-reduce:animate-none"
                            aria-hidden="true"
                        />
                    ) : null}
                    <span className="font-semibold tabular-nums text-(--ink)">
                        {total === undefined
                            ? '—'
                            : documentCountFormatter.format(total)}
                    </span>
                    tài liệu
                </span>
            </div>

            <div className="flex items-start gap-2.5 rounded-[15px] border border-blue-100/80 bg-white/45 px-3.5 py-3 text-xs leading-5 text-(--muted-ink)">
                <Info
                    className="mt-0.5 size-4 shrink-0 text-blue-600"
                    aria-hidden="true"
                />
                <p>
                    Thông tin và file đầu ra hiện có vẫn được giữ nguyên. Chọn{' '}
                    <span className="font-semibold text-blue-800">
                        Khôi phục
                    </span>{' '}
                    để đưa tài liệu trở lại danh sách và tiếp tục sử dụng.
                </p>
            </div>
        </section>
    );
}
