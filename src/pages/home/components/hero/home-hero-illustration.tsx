// Minh họa hero bằng các lớp CSS nhiều tầng; mọi chi tiết đều trang trí và ẩn khỏi trợ năng.
import powerpointIcon from '@/assets/icons/microsoft-365/powerpoint.svg';
import wordIcon from '@/assets/icons/microsoft-365/word.svg';

// Vẽ tài liệu và định dạng hỗ trợ để nhận diện nhanh hai thư viện của sản phẩm.
export function HomeHeroIllustration() {
    return (
        <div
            className={`
                relative isolate h-52.5 w-full justify-self-end
                max-[820px]:origin-right max-[820px]:scale-[0.92]
                max-[640px]:mx-auto max-[640px]:h-42.5
                max-[640px]:w-[min(100%,370px)]
                max-[640px]:origin-center max-[640px]:scale-[0.82]
                max-[640px]:justify-self-center
            `}
            aria-hidden="true"
        >
            <span className="welcome-art-glow" />
            <span className="art-sheet art-sheet-back">
                <span className="art-sheet-bar art-sheet-bar-short" />
                <span className="art-sheet-line" />
                <span className="art-sheet-line art-sheet-line-wide" />
                <span className="art-sheet-line art-sheet-line-medium" />
            </span>
            <span className="art-sheet art-sheet-front">
                <span className="art-sheet-heading">
                    <span className="art-format-label">DOCX</span>
                    <img
                        className="size-5 shrink-0 object-contain"
                        src={wordIcon}
                        alt=""
                        width="20"
                        height="20"
                    />
                </span>
                <span className="art-sheet-title-line" />
                <span className="art-sheet-line art-sheet-line-wide" />
                <span className="art-sheet-line" />
                <span className="art-sheet-line art-sheet-line-medium" />
                <span className="art-sheet-block" />
            </span>
            <span className="art-format-chip art-format-chip-doc">
                <img
                    className="size-4.5 object-contain"
                    src={wordIcon}
                    alt=""
                    width="18"
                    height="18"
                />{' '}
                DOCX
            </span>
            <span className="art-format-chip art-format-chip-slide">
                <img
                    className="size-4.5 object-contain"
                    src={powerpointIcon}
                    alt=""
                    width="18"
                    height="18"
                />{' '}
                PPTX
            </span>
        </div>
    );
}
