// Phần mở đầu và tìm kiếm của trang; query state và fetch thuộc page/hook sở hữu.
import type { ChangeEvent } from 'react';
import { LoaderCircle, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { UserDocumentsToolbarProps } from '@/pages/document-template-library/user-documents/types/user-documents-page.types';

const documentCountFormatter = new Intl.NumberFormat('vi-VN');

// Giữ tiêu đề, tổng số và thao tác tìm kiếm nhất quán khi danh sách đang làm mới.
export function UserDocumentsHeader({
    searchValue,
    isFetching,
    total,
    onSearchChange,
    onClearSearch,
}: UserDocumentsToolbarProps) {
    // Chỉ cập nhật giá trị input; hook debounce quyết định lúc gửi query lên backend.
    function handleSearchInput(event: ChangeEvent<HTMLInputElement>): void {
        onSearchChange(event.currentTarget.value);
    }

    return (
        <section className="mb-5 flex flex-col gap-5 sm:mb-6 sm:gap-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
                <div className="min-w-0">
                    <h1 className="text-pretty text-[27px] font-semibold tracking-[-0.045em] text-(--ink) sm:text-[32px]">
                        Tài liệu của tôi
                    </h1>
                    <p className="mt-1.5 max-w-xl text-sm leading-6 text-(--muted-ink)">
                        Mở lại hoặc tải xuống tài liệu đã lưu trong hồ sơ trình
                        duyệt này.
                    </p>
                </div>
                {total !== undefined && (
                    <span className="inline-flex h-9 items-center gap-2 rounded-full border border-white/90 bg-white/65 px-3.5 text-xs font-medium text-(--muted-ink) shadow-[inset_0_1px_0_rgb(255_255_255/95%)]">
                        <span className="font-semibold tabular-nums text-(--ink)">
                            {documentCountFormatter.format(total)}
                        </span>
                        tài liệu
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full min-w-0 flex-1">
                    <Search
                        className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-slate-400"
                        aria-hidden="true"
                    />
                    <Input
                        id="user-documents-search"
                        name="search"
                        type="search"
                        autoComplete="off"
                        value={searchValue}
                        onChange={handleSearchInput}
                        placeholder="Tìm theo tên tài liệu…"
                        aria-label="Tìm theo tên tài liệu"
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
                {isFetching && (
                    <span
                        className="inline-flex min-h-8 shrink-0 items-center gap-2 text-xs text-(--muted-ink)"
                        role="status"
                    >
                        <LoaderCircle
                            className="size-3.5 animate-spin motion-reduce:animate-none"
                            aria-hidden="true"
                        />
                        Đang cập nhật danh sách…
                    </span>
                )}
            </div>
        </section>
    );
}
