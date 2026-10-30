// Điều khiển search, category và page size cho catalog DOCX theo contract backend.
import { useEffect, useState } from 'react';
import type { DocumentTemplateListQuery } from '@/services/document-template';

const DOCUMENTS_PER_PAGE = 9;
const SEARCH_DEBOUNCE_MS = 300;

// Giữ input phản hồi tức thì, nhưng chỉ gửi request sau khi người dùng ngừng gõ.
export function useDocumentCatalogFilters() {
    const [searchValue, setSearchValue] = useState('');
    const [search, setSearch] = useState('');
    const [categoryId, setCategoryId] = useState<string | null>(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setSearch(searchValue.trim());
        }, SEARCH_DEBOUNCE_MS);

        // Hủy timer cũ để từ khóa đang gõ không phát sinh request trung gian.
        return () => window.clearTimeout(timeoutId);
    }, [searchValue]);

    // Thay search sẽ đưa người dùng về trang đầu để không rơi vào trang vượt tổng kết quả.
    function handleSearchChange(value: string): void {
        setSearchValue(value);
        setPage(1);
    }

    // Đổi danh mục cũng đặt lại trang vì tổng số kết quả đã thay đổi.
    function handleCategoryChange(nextCategoryId: string | null): void {
        setCategoryId(nextCategoryId);
        setPage(1);
    }

    // Chỉ nhận page dương để query không gửi giá trị bị backend từ chối.
    function handlePageChange(nextPage: number): void {
        setPage(Math.max(1, nextPage));
    }

    // Xóa đồng thời input và bộ lọc đang áp dụng để khôi phục catalog đầy đủ.
    function handleClearFilters(): void {
        setSearchValue('');
        setSearch('');
        setCategoryId(null);
        setPage(1);
    }

    const query: DocumentTemplateListQuery = {
        page,
        limit: DOCUMENTS_PER_PAGE,
        ...(search ? { search } : {}),
        ...(categoryId ? { categoryId } : {}),
    };

    return {
        categoryId,
        handleCategoryChange,
        handleClearFilters,
        handlePageChange,
        handleSearchChange,
        page,
        query,
        searchValue,
    };
}
