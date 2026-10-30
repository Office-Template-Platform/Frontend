// Bố cục ứng dụng dùng chung sidebar và thanh tiêu đề; nội dung từng route thuộc page riêng.
import { BookOpen, Layers } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { ProductNavigation } from '@/layouts/product-shell/product-navigation';

// Gom breakpoint theo từng dải để giữ nguyên khung desktop, tablet và mobile.
const workspaceShellClassName = [
    'mx-auto grid min-h-screen w-[calc(100%-64px)] max-w-[1780px] grid-cols-[258px_minmax(0,1fr)] gap-5 py-4.5',
    'max-[1100px]:w-[calc(100%-40px)] max-[1100px]:max-w-375 max-[1100px]:grid-cols-[226px_minmax(0,1fr)] max-[1100px]:gap-3.75',
    'max-[820px]:block max-[820px]:w-[calc(100%-32px)] max-[820px]:max-w-none max-[820px]:py-3.5 max-[820px]:pb-25',
    'max-[640px]:w-[calc(100%-24px)] max-[640px]:py-3 max-[640px]:pb-24.5',
].join(' ');

// Header dùng cùng bề mặt kính của ứng dụng, còn kích thước responsive ở utility Tailwind.
const workspaceHeaderClassName = [
    'glass-panel sticky top-4.5 z-40 flex min-h-19.5 items-center justify-between gap-5 rounded-[24px] px-5.5 py-3',
    'max-[820px]:top-3.5 max-[820px]:min-h-17.5 max-[820px]:rounded-[21px] max-[820px]:px-4 max-[820px]:py-2.5',
    'max-[640px]:top-3 max-[640px]:min-h-16.5 max-[640px]:rounded-[19px] max-[640px]:px-3.25',
].join(' ');

// Tạo khung desktop và mobile, đồng thời giữ điểm truy cập nội dung chính dễ tìm bằng bàn phím.
export function ProductSiteLayout() {
    return (
        <div className={workspaceShellClassName}>
            <a
                href="#main-content"
                className="sr-only z-50 rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus-visible:ring-2 focus-visible:ring-blue-500"
            >
                Đến nội dung chính
            </a>
            <ProductNavigation />
            <div className="flex min-w-0 flex-col">
                <header className={workspaceHeaderClassName}>
                    <div className="flex min-w-0 items-center gap-3.25">
                        <span
                            className="grid size-10.5 shrink-0 place-items-center rounded-[15px] border border-white/90 bg-linear-to-br from-[#f1f7ff] to-[#e5f0ff] text-(--blue-deep) shadow-[0_5px_14px_rgb(49_102_165/8%)] max-[640px]:size-9.5 max-[640px]:rounded-[13px]"
                            aria-hidden="true"
                        >
                            <BookOpen size={20} strokeWidth={1.8} />
                        </span>
                        <div className="grid min-w-0 gap-0.5">
                            <span className="text-[10px] font-[550] text-(--muted-ink) max-[640px]:text-[9px]">
                                Office Template Platform
                            </span>
                            <span className="truncate text-[15px] font-[650] tracking-[-0.02em] text-(--ink) max-[640px]:text-[13px]">
                                Không gian thư viện
                            </span>
                        </div>
                    </div>
                    <div className="flex min-h-11.5 shrink-0 items-center gap-2 whitespace-nowrap rounded-[16px] border border-[rgb(220_234_251/76%)] bg-[rgb(255_255_255/58%)] py-1.5 pr-3.5 pl-1.75 text-(--muted-ink) shadow-[inset_0_1px_0_rgb(255_255_255/90%)] max-[640px]:min-h-9.75 max-[640px]:gap-1.5 max-[640px]:rounded-[14px] max-[640px]:py-1 max-[640px]:pr-2.25 max-[640px]:pl-1.25">
                        <span
                            className="grid size-8 place-items-center rounded-[11px] bg-[#e8f2ff] text-(--blue-deep) max-[640px]:size-7 max-[640px]:rounded-[10px]"
                            aria-hidden="true"
                        >
                            <Layers size={18} strokeWidth={1.8} />
                        </span>
                        <span className="text-[14px] font-bold tabular-nums text-(--ink) max-[640px]:text-xs">
                            02
                        </span>
                        <span className="text-[11px] max-[640px]:text-[10px]">
                            thư viện
                        </span>
                    </div>
                </header>
                <div className="flex min-w-0 flex-1 flex-col px-2.5 pt-6.25 max-[820px]:px-1 max-[820px]:pt-4.5 max-[640px]:px-0.5">
                    <Outlet />
                    <footer className="flex min-h-11.5 items-center justify-between gap-3 px-0.75 pt-4.25 pb-1.25 text-[10px] text-(--muted-ink) max-[640px]:min-h-10.25 max-[640px]:pt-3.5 max-[640px]:text-[9px]">
                        <span>Office Template Platform</span>
                        <span className="max-[640px]:text-right">
                            Văn bản và trình chiếu
                        </span>
                    </footer>
                </div>
            </div>
        </div>
    );
}
