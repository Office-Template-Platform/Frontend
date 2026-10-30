// Tiêu đề của catalog văn bản; không chứa dữ liệu mẫu hoặc điều hướng.

// Giới thiệu định dạng DOCX và mục đích của trang catalog.
export function DocumentCatalogHeading() {
    return (
        <section className="page-heading">
            <div className="page-heading-copy">
                <h1>Mẫu văn bản</h1>
                <p>Chọn một mẫu DOCX để bắt đầu tài liệu theo đúng bố cục.</p>
            </div>
            <span className="format-pill">DOCX</span>
        </section>
    );
}
