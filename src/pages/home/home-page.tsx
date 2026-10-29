// Page tổng quan; phần giới thiệu và chọn thư viện thuộc các component con.
import { HomeHero } from '@/pages/home/components/hero/home-hero';
import { LibrarySelectionSection } from '@/pages/home/components/library/library-selection-section';

// Ghép các vùng chính của trang để route không chứa chi tiết từng thành phần.
export function HomePage() {
    return (
        <main className="flex min-w-0 flex-1 flex-col" id="main-content">
            <HomeHero />
            <LibrarySelectionSection />
        </main>
    );
}
