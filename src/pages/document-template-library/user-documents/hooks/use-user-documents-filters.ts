// Tách input tìm kiếm tức thời khỏi query đã debounce để tránh gọi API theo từng phím gõ.
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { UserDocumentListQuery } from '@/services/document-template';

// Giữ mỗi trang ngắn gọn; backend dùng limit này để truy vấn trang và tính totalPages.
const USER_DOCUMENTS_PER_PAGE = 6;
const SEARCH_DEBOUNCE_MS = 300;

// Quản lý tìm kiếm và phân trang theo giới hạn GET /user-documents của backend.
export function useUserDocumentsFilters() {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get('search')?.trim() ?? '';
    const pageValue = Number(searchParams.get('page'));
    const page = Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1;
    const [searchValue, setSearchValue] = useState(search);

    useEffect(() => {
        setSearchValue(search);
    }, [search]);

    useEffect(() => {
        const normalizedSearch = searchValue.trim();

        if (normalizedSearch === search) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setSearchParams(
                (currentParams) => {
                    const nextParams = new URLSearchParams(currentParams);

                    if (normalizedSearch) {
                        nextParams.set('search', normalizedSearch);
                    } else {
                        nextParams.delete('search');
                    }

                    // Từ khóa mới bắt đầu từ trang đầu vì tổng số trang có thể đã thay đổi.
                    nextParams.delete('page');
                    return nextParams;
                },
                { replace: true },
            );
        }, SEARCH_DEBOUNCE_MS);

        // Hủy request tìm kiếm cũ khi người dùng tiếp tục nhập trước khi debounce kết thúc.
        return () => window.clearTimeout(timeoutId);
    }, [searchValue, search, setSearchParams]);

    // Giữ input mượt; query và URL được cập nhật một lần sau khi người dùng ngừng gõ.
    function handleSearchChange(value: string): void {
        setSearchValue(value);
    }

    // Xóa ngay cả input lẫn URL filter để trở lại danh sách đầy đủ mà không chờ debounce.
    function handleClearSearch(): void {
        setSearchValue('');
        setSearchParams(
            (currentParams) => {
                const nextParams = new URLSearchParams(currentParams);
                nextParams.delete('search');
                nextParams.delete('page');
                return nextParams;
            },
            { replace: true },
        );
    }

    // Đồng bộ trang với URL để có thể tải lại hoặc chia sẻ đúng trang danh sách.
    function handlePageChange(nextPage: number): void {
        const safePage = Math.max(1, nextPage);

        setSearchParams(
            (currentParams) => {
                const nextParams = new URLSearchParams(currentParams);

                if (safePage === 1) {
                    nextParams.delete('page');
                } else {
                    nextParams.set('page', String(safePage));
                }

                return nextParams;
            },
            { replace: true },
        );
    }

    const query: UserDocumentListQuery = {
        page,
        limit: USER_DOCUMENTS_PER_PAGE,
        ...(search ? { search } : {}),
    };

    return {
        handleClearSearch,
        handlePageChange,
        handleSearchChange,
        hasSearch: Boolean(search),
        page,
        query,
        searchValue,
    };
}
