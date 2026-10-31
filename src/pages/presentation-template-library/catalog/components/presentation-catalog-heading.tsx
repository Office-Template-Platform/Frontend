// Giới thiệu thư viện PPTX theo cùng nhịp heading và nhãn định dạng của catalog DOCX.
export function PresentationCatalogHeading() {
    return (
        <section className="page-heading">
            <div className="page-heading-copy">
                <h1>Mẫu trình chiếu</h1>
                <p>Chọn một mẫu PPTX để bắt đầu bài thuyết trình của bạn.</p>
            </div>
            <span className="format-pill format-pill-presentation">PPTX</span>
        </section>
    );
}
