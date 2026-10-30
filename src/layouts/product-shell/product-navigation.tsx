// Sidebar sở hữu điều hướng và nhãn định dạng; route active do React Router cung cấp.
import { FolderOpen, Layers, LayoutDashboard } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import powerpointIcon from '@/assets/icons/microsoft-365/powerpoint.svg';
import wordIcon from '@/assets/icons/microsoft-365/word.svg';
import { ROUTE_PATHS } from '@/shared/config/route-paths';

// Giữ chiều cao viewport có fallback và gom các ngoại lệ mobile vào đúng breakpoint.
const productSidebarClassName = [
    'glass-panel sticky top-4.5 z-30 flex h-[calc(100vh-36px)] min-h-0 min-w-0 flex-col self-start overflow-y-auto rounded-[28px] px-3.5 pt-5.25 pb-3.75',
    'supports-[height:100dvh]:h-[calc(100dvh-36px)] max-[1100px]:px-2.75',
    'max-[820px]:fixed max-[820px]:top-auto max-[820px]:z-50 max-[820px]:right-[max(12px,env(safe-area-inset-right))] max-[820px]:bottom-[max(12px,env(safe-area-inset-bottom))] max-[820px]:left-[max(12px,env(safe-area-inset-left))]',
    'max-[820px]:mx-auto max-[820px]:h-auto max-[820px]:min-h-0 max-[820px]:w-auto max-[820px]:max-w-130 max-[820px]:flex-row max-[820px]:overflow-visible max-[820px]:rounded-[22px] max-[820px]:px-2.25 max-[820px]:py-1.75',
    'max-[820px]:shadow-[0_16px_45px_rgb(42_86_139/18%),inset_0_1px_0_rgb(255_255_255/92%)]',
].join(' ');

// Gom utility dùng chung cho link desktop và dock mobile; màu active giữ trong CSS vì dùng gradient riêng.
const sidebarLinkClassName = [
    'sidebar-link flex min-h-12 items-center gap-3 rounded-[15px] border border-transparent px-3 text-[13px] font-[560] text-[#647793] aria-[current=page]:font-[650]',
    'transition-transform duration-160 hover:bg-white/60 hover:text-(--ink) active:scale-[0.985]',
    'max-[820px]:min-h-15 max-[820px]:flex-col max-[820px]:justify-center max-[820px]:gap-1 max-[820px]:rounded-[16px] max-[820px]:px-1 max-[820px]:py-1.5 max-[820px]:text-[10px] max-[820px]:leading-[1.2]',
].join(' ');

// Dẫn tới tài liệu đã tạo và các thư viện mẫu; cuối sidebar tóm tắt định dạng có sẵn.
export function ProductNavigation() {
    return (
        <aside className={productSidebarClassName}>
            <Link
                className="mx-1.25 mb-9.5 flex min-h-12.5 items-center gap-3 max-[820px]:hidden"
                to={ROUTE_PATHS.home}
                aria-label="Office Template Platform — về tổng quan"
            >
                <img
                    className="size-11 shrink-0 rounded-[15px] border border-[rgb(219_232_249/80%)] bg-white object-contain shadow-[0_5px_14px_rgb(44_98_165/10%)]"
                    src="/images/office-template-logo.png"
                    alt=""
                    width="44"
                    height="44"
                />
                <span className="grid min-w-0 gap-0.75">
                    <strong className="text-[14px] font-[680] tracking-tight text-(--ink)">
                        Office Template
                    </strong>
                    <small className="text-[11px] text-(--muted-ink)">
                        Thư viện mẫu
                    </small>
                </span>
            </Link>

            <span className="mb-2.5 px-3 text-xs font-semibold text-(--muted-ink) max-[820px]:hidden">
                Thư viện
            </span>
            <nav
                className="grid gap-1.25 max-[820px]:w-full max-[820px]:grid-cols-4"
                aria-label="Điều hướng thư viện và tài liệu cá nhân"
            >
                <NavLink
                    className={sidebarLinkClassName}
                    to={ROUTE_PATHS.home}
                    end
                >
                    <span
                        className="sidebar-link-icon grid size-5.75 shrink-0 place-items-center text-[#7890b2]"
                        aria-hidden="true"
                    >
                        <LayoutDashboard size={19} strokeWidth={1.8} />
                    </span>
                    <span>Tổng quan</span>
                </NavLink>
                <NavLink
                    className={sidebarLinkClassName}
                    to={ROUTE_PATHS.userDocuments}
                >
                    <span
                        className="sidebar-link-icon grid size-5.75 shrink-0 place-items-center text-[#7890b2]"
                        aria-hidden="true"
                    >
                        <FolderOpen size={19} strokeWidth={1.8} />
                    </span>
                    <span>Tài liệu của tôi</span>
                </NavLink>
                <NavLink
                    className={sidebarLinkClassName}
                    to={ROUTE_PATHS.documentTemplateCatalog}
                >
                    <span
                        className="sidebar-link-icon grid size-5.75 shrink-0 place-items-center text-[#7890b2]"
                        aria-hidden="true"
                    >
                        <img
                            className="size-4.75 object-contain"
                            src={wordIcon}
                            alt=""
                            width="19"
                            height="19"
                        />
                    </span>
                    <span>Mẫu văn bản</span>
                </NavLink>
                <NavLink
                    className={sidebarLinkClassName}
                    to={ROUTE_PATHS.presentationTemplateCatalog}
                >
                    <span
                        className="sidebar-link-icon grid size-5.75 shrink-0 place-items-center text-[#7890b2]"
                        aria-hidden="true"
                    >
                        <img
                            className="size-4.75 object-contain"
                            src={powerpointIcon}
                            alt=""
                            width="19"
                            height="19"
                        />
                    </span>
                    <span>Mẫu trình chiếu</span>
                </NavLink>
            </nav>

            <div className="mt-auto grid gap-4.75 max-[820px]:hidden">
                <div className="sidebar-note-surface rounded-[20px] px-3 py-3.25">
                    <div className="mb-2.5 flex items-center gap-2.25">
                        <span
                            className="grid size-7.5 shrink-0 place-items-center rounded-[12px] border border-white/90 bg-[#e7f2ff] text-(--blue-deep)"
                            aria-hidden="true"
                        >
                            <Layers size={16} strokeWidth={1.8} />
                        </span>
                        <span className="text-xs font-[650] text-(--ink)">
                            Định dạng mẫu
                        </span>
                    </div>
                    <ul className="m-0 grid list-none gap-1.5 p-0">
                        <li className="flex min-h-7.75 items-center gap-1.75 px-px py-0.75">
                            <span
                                className="grid size-4.75 shrink-0 place-items-center text-[#6487ad]"
                                aria-hidden="true"
                            >
                                <img
                                    className="size-4.75 object-contain"
                                    src={wordIcon}
                                    alt=""
                                    width="19"
                                    height="19"
                                />
                            </span>
                            <span className="min-w-0 flex-1 text-[11px] text-(--muted-ink)">
                                Văn bản
                            </span>
                            <span className="inline-flex min-h-5.5 min-w-10.25 items-center justify-center rounded-[7px] border border-white/90 bg-white/60 px-1.5 text-[9px] font-bold tracking-[0.03em] text-[#41688f]">
                                DOCX
                            </span>
                        </li>
                        <li className="flex min-h-7.75 items-center gap-1.75 px-px py-0.75">
                            <span
                                className="grid size-4.75 shrink-0 place-items-center text-[#6487ad]"
                                aria-hidden="true"
                            >
                                <img
                                    className="size-4.75 object-contain"
                                    src={powerpointIcon}
                                    alt=""
                                    width="19"
                                    height="19"
                                />
                            </span>
                            <span className="min-w-0 flex-1 text-[11px] text-(--muted-ink)">
                                Trình chiếu
                            </span>
                            <span className="inline-flex min-h-5.5 min-w-10.25 items-center justify-center rounded-[7px] border border-white/90 bg-white/60 px-1.5 text-[9px] font-bold tracking-[0.03em] text-[#41688f]">
                                PPTX
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    );
}
