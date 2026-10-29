// Minh họa trang trí cho empty state; được ẩn khỏi cây trợ năng vì không truyền tải dữ liệu.
import powerpointIcon from '@/assets/icons/microsoft-365/powerpoint.svg';

// Dựng hình slide bằng các lớp CSS hiện có để thay được bằng thumbnail khi có dữ liệu.
export function PresentationEmptyIllustration() {
    return (
        <div
            className="empty-visual presentation-empty-visual"
            aria-hidden="true"
        >
            <span className="empty-visual-glow" />
            <span className="empty-slide empty-slide-back" />
            <span className="empty-slide empty-slide-front">
                <span className="empty-slide-heading" />
                <span className="empty-slide-copy" />
                <span className="empty-slide-graphic" />
            </span>
            <span className="empty-slide-icon">
                <img
                    className="size-5.5 object-contain"
                    src={powerpointIcon}
                    alt=""
                    width="22"
                    height="22"
                />
            </span>
        </div>
    );
}
