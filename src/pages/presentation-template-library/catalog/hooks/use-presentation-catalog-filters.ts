// Quản lý input tìm kiếm PPTX và chỉ áp dụng từ khóa sau một nhịp debounce ngắn.
import { useEffect, useState } from 'react';

const SEARCH_DEBOUNCE_MS = 300;

// Giữ input phản hồi tức thì, đồng thời trì hoãn việc lọc catalog đến khi người dùng ngừng gõ.
export function usePresentationCatalogFilters() {
    const [searchValue, setSearchValue] = useState('');
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null,
    );

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setSearch(searchValue.trim());
        }, SEARCH_DEBOUNCE_MS);

        // Hủy lần lọc đang chờ nếu người dùng tiếp tục sửa từ khóa.
        return () => window.clearTimeout(timeoutId);
    }, [searchValue]);

    // Đồng bộ cả input và từ khóa đã áp dụng để nút xóa lọc phản hồi ngay.
    function handleClearFilters(): void {
        setSearchValue('');
        setSearch('');
        setSelectedCategory(null);
    }

    return {
        handleClearFilters,
        search,
        searchValue,
        selectedCategory,
        setSearchValue,
        setSelectedCategory,
    };
}
