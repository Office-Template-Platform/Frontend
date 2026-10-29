// Hero trang chủ; giữ nội dung giới thiệu và chuyển phần minh họa sang component riêng.
import { HomeHeroIllustration } from '@/pages/home/components/hero/home-hero-illustration';

// Giới thiệu mục đích của nền tảng trước khi người dùng chọn thư viện mẫu.
export function HomeHero() {
    return (
        <section
            className={`
                mb-4.5 grid min-h-52.5 items-center gap-5
                grid-cols-[minmax(0,1fr)_minmax(270px,390px)]
                max-[1100px]:gap-3
                max-[1100px]:grid-cols-[minmax(0,1fr)_minmax(220px,310px)]
                max-[820px]:min-h-0
                max-[820px]:gap-0.75
                max-[820px]:grid-cols-[minmax(0,1fr)_minmax(210px,270px)]
                max-[640px]:mb-2
                max-[640px]:grid-cols-1
                max-[640px]:gap-0
            `}
        >
            <div className="py-2 pl-2 max-[640px]:pl-0.75">
                <h1
                    className={`
                        mb-2.5 max-w-160 text-[#1c2e4b]
                        text-[clamp(30px,3.5vw,45px)] font-[630]
                        leading-[1.06] tracking-[-0.055em] text-balance
                        max-[1100px]:text-[clamp(30px,3.8vw,40px)]
                        max-[640px]:text-[clamp(31px,8.4vw,40px)]
                    `}
                >
                    Bắt đầu tài liệu
                    <br />
                    bằng mẫu phù hợp.
                </h1>
                <p
                    className={`
                        m-0 max-w-127.5 text-[14px]
                        leading-[1.65] text-(--muted-ink)
                        max-[640px]:max-w-112.5
                        max-[640px]:text-[13px]
                    `}
                >
                    Chọn thư viện văn bản hoặc trình chiếu để tiếp tục. Mỗi loại
                    nội dung có không gian riêng.
                </p>
            </div>

            <HomeHeroIllustration />
        </section>
    );
}
