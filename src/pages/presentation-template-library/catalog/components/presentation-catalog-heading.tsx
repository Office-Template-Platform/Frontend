// Tiêu đề của catalog trình chiếu; không chứa dữ liệu mẫu hoặc điều hướng.

// Giới thiệu định dạng PPTX và mục đích của trang catalog.
export function PresentationCatalogHeading() {
    return (
        <section className="page-heading">
            <div className="page-heading-copy">
                <p className="page-eyebrow">Thư viện trình chiếu</p>
                <h1>Mẫu trình chiếu</h1>
                <p>Khám phá bộ slide để bắt đầu một bản trình chiếu mới.</p>
            </div>
            <span className="format-pill format-pill-presentation">PPTX</span>
        </section>
    );
}
