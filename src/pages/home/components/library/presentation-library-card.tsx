// Lối vào catalog PPTX; điều hướng và phần xem trước slide thuộc cùng một thẻ.
import { Link } from 'react-router-dom';
import powerpointIcon from '@/assets/icons/microsoft-365/powerpoint.svg';
import { ROUTE_PATHS } from '@/shared/config/route-paths';

// Đưa người dùng tới thư viện trình chiếu bằng một liên kết có thể thao tác toàn thẻ.
export function PresentationLibraryCard() {
    return (
        <Link
            className={`
                product-card glass-panel relative flex min-h-92.5
                min-w-0 scroll-mt-28 flex-col overflow-hidden rounded-[25px]
                p-3.75 text-inherit
                transition-shadow duration-200 ease-out
                before:pointer-events-none before:absolute before:inset-0
                before:rounded-[inherit] before:border before:border-white/70
                before:content-['']
                focus-visible:outline-[3px]
                focus-visible:outline-[rgb(33_118_229/68%)]
                focus-visible:outline-offset-4
                max-[1100px]:min-h-88.75
                max-[640px]:min-h-0 max-[640px]:rounded-[22px]
                max-[640px]:p-3
                [@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_24px_52px_rgb(49_98_154/18%),0_8px_20px_rgb(49_98_154/8%),inset_0_1px_0_rgb(255_255_255/94%)]
                focus-visible:before:border-[rgb(82_145_221/72%)]
            `}
            to={ROUTE_PATHS.presentationTemplateCatalog}
        >
            <div className="relative z-1 mx-0.5 mb-2.75 flex min-h-12.5 items-center gap-2.75">
                <span
                    className={`
                        grid size-11.25 shrink-0 place-items-center
                        rounded-[15px] border border-white/95
                        bg-[linear-gradient(145deg,#e4f7ff,#d9f0ff)]
                        text-[#267fae]
                        shadow-[0_7px_16px_rgb(51_100_161/10%),inset_0_1px_0_rgb(255_255_255/84%)]
                    `}
                    aria-hidden="true"
                >
                    <img
                        className="size-7.5 object-contain"
                        src={powerpointIcon}
                        alt=""
                        width="30"
                        height="30"
                    />
                </span>
                <span className="min-w-0 truncate text-[11px] font-[580] text-[#647793]">
                    Microsoft PowerPoint
                </span>
            </div>
            <div
                className="template-art presentation-template-art mb-0.75"
                aria-hidden="true"
            >
                <span className="slide-card slide-card-back" />
                <span className="slide-card slide-card-middle" />
                <span className="slide-card slide-card-front">
                    <span className="slide-card-title" />
                    <span className="slide-card-subtitle" />
                    <span className="slide-card-graphic" />
                </span>
                <span className="template-art-orb" />
            </div>
            <div className="relative z-1 flex flex-1 flex-col px-2 pt-4.25 pb-1.75">
                <h3 className="mb-1.75 text-[18px] font-[640] tracking-[-0.035em] text-(--ink) text-balance max-[640px]:text-[16px]">
                    Thư viện mẫu trình chiếu
                </h3>
                <p className="mb-5 max-w-102.5 text-[12px] leading-[1.65] text-(--muted-ink) max-[640px]:mb-3">
                    Khám phá bộ slide để bắt đầu một bản trình chiếu.
                </p>
            </div>
        </Link>
    );
}
