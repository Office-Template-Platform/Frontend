// Minh họa trang trí cho empty state; được ẩn khỏi cây trợ năng vì không truyền tải dữ liệu.
import wordIcon from '@/assets/icons/microsoft-365/word.svg';

// Dựng hình tài liệu bằng các lớp CSS hiện có để thay bằng thumbnail khi có dữ liệu.
export function DocumentEmptyIllustration() {
    return (
        <div className="empty-visual document-empty-visual" aria-hidden="true">
            <span className="empty-visual-glow" />
            <span className="empty-file-icon">
                <img
                    className="size-10 object-contain"
                    src={wordIcon}
                    alt=""
                    width="40"
                    height="40"
                />
            </span>
            <span className="empty-file-line empty-file-line-wide" />
            <span className="empty-file-line" />
            <span className="empty-file-line empty-file-line-short" />
        </div>
    );
}
