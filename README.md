<div align="center">
  <img src="src/assets/images/office-template-platform-banner.png" alt="Nền tảng mẫu Office" width="1200" />

  <h1>Office Template Web</h1>

  <p><strong>Duyệt mẫu, tạo bản sao, chỉnh sửa và quản lý tài liệu Word cùng PowerPoint trong một không gian làm việc.</strong></p>

  <p>
    <img alt="React 19" src="https://img.shields.io/badge/React-19-149ECA?logo=react&amp;logoColor=white" />
    <img alt="TypeScript 5" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&amp;logoColor=white" />
    <img alt="Vite 8" src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&amp;logoColor=white" />
    <img alt="Tailwind CSS 4" src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&amp;logoColor=white" />
    <img alt="Redux Toolkit 2" src="https://img.shields.io/badge/Redux_Toolkit-2-764ABC?logo=redux&amp;logoColor=white" />
    <img alt="ONLYOFFICE Docs" src="https://img.shields.io/badge/Editor-ONLYOFFICE-444444" />
  </p>
</div>

## Mục lục

- [Tổng quan](#tổng-quan)
- [Tính năng](#tính-năng)
- [Công nghệ chính](#công-nghệ-chính)
- [Yêu cầu](#yêu-cầu)
- [Bắt đầu](#bắt-đầu)
    - [Cấu hình ONLYOFFICE](#cấu-hình-onlyoffice)
- [Các lệnh khả dụng](#các-lệnh-khả-dụng)
- [Các route](#các-route)
- [Luồng tài liệu](#luồng-tài-liệu)
    - [Tạo và chỉnh sửa bản sao](#tạo-và-chỉnh-sửa-bản-sao)
    - [Lưu từ editor nhúng](#lưu-từ-editor-nhúng)
    - [Thùng rác và khôi phục](#thùng-rác-và-khôi-phục)
- [Tích hợp API](#tích-hợp-api)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
    - [Ghi chú kiến trúc](#ghi-chú-kiến-trúc)

## Tổng quan

Office Template Web là ứng dụng React một trang của nền tảng Office Template Platform. Ứng dụng có thư viện mẫu DOCX và PPTX riêng, không gian lưu tài liệu theo trình duyệt và trình soạn thảo ONLYOFFICE được nhúng trên web.

Người dùng có thể tạo bản sao riêng từ mẫu, chỉnh sửa ngay trên web hoặc bằng ứng dụng Office trên máy tính, rồi cập nhật file đã sửa vào đúng bản sao. File mẫu gốc không bị thay đổi. Tài liệu của người dùng có thể được tải xuống, chuyển vào thùng rác và khôi phục.

Frontend nằm trong thư mục này. Hướng dẫn về API NestJS, cơ sở dữ liệu, lưu trữ file và tích hợp ONLYOFFICE nằm trong [`../api/README.md`](../api/README.md).

## Tính năng

- Duyệt và xem trước mẫu DOCX, PPTX.
- Tìm kiếm, lọc danh mục và phân trang mẫu DOCX qua API.
- Tìm kiếm và lọc danh sách mẫu PPTX đã tải về ngay trên trình duyệt.
- Tạo bản sao riêng và đặt tên cho tài liệu từ cả hai loại mẫu.
- Chỉnh sửa bản DOCX, PPTX đã sẵn sàng bằng trình soạn thảo ONLYOFFICE nhúng.
- Tải file về sửa bằng Word hoặc PowerPoint, sau đó tải file đã sửa lên để cập nhật bản sao.
- Quản lý tài liệu đã lưu tại **Tài liệu của tôi**: tìm kiếm, phân trang, mở editor và tải file.
- Chuyển tài liệu vào thùng rác bằng cơ chế xóa mềm và khôi phục sau đó.
- Hiển thị trạng thái đang tải, danh sách trống và lỗi cho thư viện, editor và luồng tài liệu.
- Giao diện thư viện và thanh bên editor thích ứng với máy tính và thiết bị di động.

## Công nghệ chính

| Khu vực                            | Công nghệ                                   | Vai trò                                                   |
| ---------------------------------- | ------------------------------------------- | --------------------------------------------------------- |
| Giao diện                          | React 19, TypeScript 5                      | Xây dựng ứng dụng theo component và kiểm tra kiểu dữ liệu |
| Máy chủ phát triển và định tuyến   | Vite 8, React Router 7                      | Chạy ứng dụng, quản lý route và tải trang theo nhu cầu    |
| Giao diện và thành phần dùng chung | Tailwind CSS 4, shadcn/ui, Radix UI, Lucide | Tạo kiểu, thành phần truy cập được và biểu tượng          |
| Dữ liệu phía client                | Redux Toolkit, RTK Query, React Redux       | Gọi API, lưu cache và đồng bộ trạng thái giữa các trang   |
| Form và xác thực dữ liệu           | React Hook Form, Zod, `@hookform/resolvers` | Quản lý form và kiểm tra dữ liệu đầu vào                  |
| Thông báo                          | Sonner                                      | Hiển thị kết quả thao tác và lỗi API                      |
| Trình soạn thảo                    | ONLYOFFICE Docs                             | Chỉnh sửa DOCX và PPTX trên web                           |

## Yêu cầu

- Node.js phiên bản `^20.19.0` hoặc `>=22.12.0` theo `package.json`.
- npm; repository có sẵn `package-lock.json`.
- API và PostgreSQL được cấu hình theo hướng dẫn trong [`../api/README.md`](../api/README.md).
- Máy chủ ONLYOFFICE Docs có thể truy cập được để chỉnh sửa file trên web.

## Bắt đầu

Chạy các lệnh sau từ thư mục gốc repository:

```bash
cd web
npm ci
cp .env.example .env.local
npm run dev
```

Vite chạy ứng dụng tại `http://localhost:3000`. Nếu cổng này đang được sử dụng, Vite có thể chọn cổng khả dụng tiếp theo.

Địa chỉ API mặc định là `http://localhost:3001/api`. Nếu API chạy ở địa chỉ khác, hãy sửa `VITE_API_BASE_URL` trong `.env.local`:

```dotenv
VITE_API_BASE_URL=http://localhost:3001/api
```

Ứng dụng gửi request kèm thông tin xác thực của trình duyệt. API cần cho phép request có credentials từ origin của web để trình duyệt gửi cookie workspace `HttpOnly`. Cookie này gắn tài liệu với hồ sơ trình duyệt hiện tại; hồ sơ trình duyệt khác sẽ có workspace riêng.

### Cấu hình ONLYOFFICE

Frontend lấy cấu hình editor từ API. Response của API cung cấp URL script Docs API và cấu hình tài liệu đã ký; frontend không tự cấu hình URL Docs Server hoặc JWT secret. Hãy cấu hình API và Docs Server theo hướng dẫn backend, đồng thời bảo đảm trình duyệt truy cập được các URL API trả về. Route editor hỗ trợ tài liệu DOCX và PPTX có trạng thái `ready`.

## Các lệnh khả dụng

Chạy các lệnh từ thư mục `web/`:

| Lệnh                 | Mục đích                                                        |
| -------------------- | --------------------------------------------------------------- |
| `npm run dev`        | Chạy máy chủ phát triển Vite                                    |
| `npm run type-check` | Kiểm tra TypeScript mà không tạo file đầu ra                    |
| `npm run lint`       | Chạy ESLint                                                     |
| `npm run build`      | Kiểm tra kiểu dữ liệu và tạo bản build production trong `dist/` |
| `npm run preview`    | Chạy thử bản build production trên máy cục bộ                   |

Hiện `package.json` chưa khai báo lệnh chạy test cho frontend.

## Các route

| Đường dẫn                       | Mục đích                                                                |
| ------------------------------- | ----------------------------------------------------------------------- |
| `/`                             | Chọn thư viện văn bản hoặc thư viện trình chiếu                         |
| `/document-templates`           | Duyệt, xem trước và tạo bản sao từ mẫu DOCX                             |
| `/presentation-templates`       | Duyệt, xem trước và tạo bản sao từ mẫu PPTX                             |
| `/my-documents`                 | Tìm kiếm, phân trang, mở, tải hoặc chuyển tài liệu đã lưu vào thùng rác |
| `/my-documents/trash`           | Tìm tài liệu đã xóa mềm và khôi phục                                    |
| `/documents/:documentId/editor` | Mở editor ONLYOFFICE toàn màn hình cho tài liệu người dùng              |
| Các đường dẫn khác              | Hiển thị trang không tìm thấy                                           |

Editor nằm ngoài khung thư viện để sử dụng toàn bộ chiều cao cửa sổ. Các trang thư viện còn lại dùng chung thanh điều hướng và bố cục workspace thích ứng.

## Luồng tài liệu

### Tạo và chỉnh sửa bản sao

1. Mở thư viện DOCX hoặc PPTX và xem trước một mẫu.
2. Chọn **Dùng mẫu** và nhập tên cho bản sao nếu cần.
3. Khi bản sao sẵn sàng, chọn **Chỉnh sửa trên web** để mở ONLYOFFICE hoặc tải file về sửa bằng Word/PowerPoint.
4. Tải file DOCX/PPTX đã sửa lên trong phần kết quả tạo bản sao để cập nhật đúng tài liệu đó.
5. Bản sao đã lưu xuất hiện trong **Tài liệu của tôi**; mẫu gốc vẫn được giữ nguyên.

Form tải file chỉ nhận đúng định dạng Office tương ứng và giới hạn dung lượng 25 MB. API vẫn chịu trách nhiệm kiểm tra MIME type và nội dung file.

### Lưu từ editor nhúng

Editor ghi nhận thay đổi và cảnh báo trước khi rời trang nếu nội dung chưa được lưu. Nút **Lưu và thoát** đóng phiên editor, sau đó chờ metadata từ API phản ánh phiên bản vừa lưu rồi mới quay về **Tài liệu của tôi**. Frontend kiểm tra callback lưu trong một khoảng thời gian ngắn và thông báo nếu chưa nhận được xác nhận kịp thời.

### Thùng rác và khôi phục

Khi xóa tài liệu đã lưu, API chỉ đặt trạng thái xóa mềm. Bản ghi tài liệu và file đầu ra hiện có được giữ lại để khôi phục. Trang thùng rác hỗ trợ tìm kiếm và phân trang; khôi phục sẽ đưa tài liệu về **Tài liệu của tôi**. Frontend chưa có thao tác xóa vĩnh viễn vì API hiện không cung cấp endpoint này. Một số bản ghi cũ có thể không khôi phục được nếu file đầu ra đã bị xóa trước đó.

## Tích hợp API

`src/shared/api/api-client.ts` cấu hình RTK Query với địa chỉ API, `credentials: 'include'`, các cache tag dùng chung và Redux store. Các service theo tính năng bóc dữ liệu từ response dạng `{ success, data, meta }`. Link tải file và tài nguyên editor được cung cấp bởi API.

Frontend hiện sử dụng các khả năng API sau:

| Luồng                        | Endpoint được sử dụng                                                                                                |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Thư viện DOCX                | `GET /document-templates`, `GET /document-templates/categories`, `GET /document-templates/:templateId`               |
| Tạo bản sao DOCX             | `POST /document-templates/:templateId/documents`                                                                     |
| Thư viện và tạo bản sao PPTX | `GET /presentation-templates`, `POST /presentation-templates/:templateId/documents`                                  |
| Tài liệu của tôi             | `GET /user-documents` và các URL metadata/tải file                                                                   |
| Chỉnh sửa bằng ONLYOFFICE    | `GET /user-documents/:documentId/editor-config`; xác nhận lưu đi qua callback của API                                |
| Tải file Office đã sửa lên   | `PUT /user-documents/:documentId/content`                                                                            |
| Thùng rác và khôi phục       | `DELETE /user-documents/:documentId`, `GET /user-documents/trash/items`, `PATCH /user-documents/:documentId/restore` |

Tìm kiếm, lọc danh mục và phân trang của thư viện DOCX được gửi lên API. Endpoint PPTX hiện trả về toàn bộ metadata mẫu, nên frontend tìm kiếm và lọc danh mục trên dữ liệu đã tải; thư viện PPTX chưa có phân trang. Nếu API chưa có mẫu được phát hành, giao diện hiển thị trạng thái trống thay vì tự tạo dữ liệu demo.

## Cấu trúc dự án

```text
web/
├── public/
│   └── images/
│       └── office-template-logo.png        # Logo dùng bằng URL tĩnh
├── src/
│   ├── assets/
│   │   ├── icons/microsoft-365/            # word.svg và powerpoint.svg
│   │   └── images/                         # Banner của sản phẩm
│   ├── components/ui/                      # Nút, hộp thoại, ô nhập, skeleton, thông báo
│   ├── config/api.config.ts                # Địa chỉ API mặc định và biến môi trường
│   ├── layouts/
│   │   ├── empty-shell/                    # Khung tối giản cho trang độc lập
│   │   └── product-shell/                  # Sidebar và khung thư viện
│   ├── main.tsx                            # Điểm khởi chạy React
│   ├── pages/
│   │   ├── home/                           # Trang chọn thư viện
│   │   │   ├── components/
│   │   │   │   ├── hero/                   # Hero và minh họa trang chủ
│   │   │   │   └── library/                # Thẻ vào thư viện DOCX/PPTX
│   │   │   └── home-page.tsx                # Trang chọn loại thư viện
│   │   ├── document-template-library/
│   │   │   ├── catalog/                    # Trang catalog và bộ lọc mẫu DOCX
│   │   │   │   ├── components/
│   │   │   │   │   ├── catalog/            # Tiêu đề, tìm kiếm, lọc, phân trang, trạng thái
│   │   │   │   │   ├── create-document/    # Dialog tạo bản sao và tải file đã sửa
│   │   │   │   │   │   ├── components/     # Form, panel kết quả, upload DOCX
│   │   │   │   │   │   ├── hooks/          # Điều phối state và request tạo/lưu
│   │   │   │   │   │   ├── schemas/        # Schema Zod cho tên và file DOCX
│   │   │   │   │   │   └── types/          # Kiểu dữ liệu của workflow
│   │   │   │   │   ├── empty-state/        # Trạng thái catalog rỗng
│   │   │   │   │   └── template/           # Card và dialog xem trước mẫu
│   │   │   │   ├── hooks/                  # Tìm kiếm, danh mục và phân trang
│   │   │   │   └── types/                  # Kiểu UI riêng của catalog
│   │   │   ├── editor/                     # Editor DOCX/PPTX toàn màn hình
│   │   │   │   ├── document-editor-page.tsx
│   │   │   │   ├── components/             # ONLYOFFICE, sidebar, trạng thái lưu
│   │   │   │   └── types/                  # Kiểu DocsAPI và props của editor
│   │   │   ├── trash/                      # Danh sách tài liệu xóa mềm và khôi phục
│   │   │   │   ├── components/             # Header, danh sách và loading/error/empty
│   │   │   │   └── trash-documents-page.tsx
│   │   │   └── user-documents/              # Danh sách tài liệu riêng của người dùng
│   │   │       ├── components/             # Header, collection, pagination, delete dialog
│   │   │       ├── hooks/                  # Search và phân trang theo URL
│   │   │       ├── types/                  # Props của page và collection
│   │   │       └── user-documents-page.tsx
│   │   ├── presentation-template-library/
│   │   │   └── catalog/                    # Catalog PPTX và workflow tạo bản sao
│   │   │       ├── components/
│   │   │       │   ├── create-presentation/ # Luồng tạo bản sao PPTX
│   │   │       │   │   ├── components/     # Form, panel kết quả, form tải file
│   │   │       │   │   ├── hooks/          # Điều phối state và request
│   │   │       │   │   ├── schemas/        # Kiểm tra dữ liệu đầu vào của form
│   │   │       │   │   ├── types/          # Kiểu dữ liệu của workflow
│   │   │       │   │   └── create-presentation-dialog.tsx
│   │   │       │   ├── presentation-catalog-controls.tsx
│   │   │       │   ├── presentation-catalog-heading.tsx
│   │   │       │   ├── presentation-catalog-skeleton.tsx
│   │   │       │   ├── presentation-empty-illustration.tsx
│   │   │       │   ├── presentation-empty-state.tsx
│   │   │       │   ├── presentation-template-artwork.tsx
│   │   │       │   ├── presentation-template-card.tsx
│   │   │       │   └── presentation-template-preview-dialog.tsx
│   │   │       ├── hooks/                  # Tìm kiếm debounce và lọc danh mục
│   │   │       ├── types/                  # Kiểu UI của catalog PPTX
│   │   │       └── presentation-library-page.tsx
│   │   └── system/not-found/               # Trang báo không tìm thấy
│   │       ├── components/not-found-card.tsx
│   │       └── not-found-page.tsx
│   ├── providers/                          # Redux Provider và Sonner Toaster
│   ├── routes/
│   │   ├── modules/                        # Route nhóm DOCX/editor và PPTX
│   │   └── router.tsx                      # Ghép route với layout
│   ├── services/                           # Endpoint RTK Query và kiểu dữ liệu API
│   │   ├── document-template/              # Mẫu DOCX, tài liệu, thùng rác, editor
│   │   │   ├── api/document-template.api.ts
│   │   │   ├── types/document-template.types.ts
│   │   │   └── index.ts                    # Các hook và type được export
│   │   └── presentation-template/           # Catalog và tạo bản sao PPTX
│   │       ├── api/presentation-template.api.ts
│   │       ├── types/presentation-template.types.ts
│   │       └── index.ts
│   ├── shared/
│   │   ├── api/                            # Client API, kiểu response và xử lý lỗi
│   │   ├── config/                         # Đường dẫn route
│   │   └── lib/                            # Tiện ích dùng chung
│   ├── store/                              # Redux store và typed hooks
│   └── styles/
│       ├── global/                         # CSS entry, theme, nền tảng, accessibility
│       ├── layout/                         # Sidebar và workspace shell
│       └── pages/                          # Style riêng cho catalog, home, not-found
├── .env.example                            # Biến môi trường mẫu
├── components.json                         # Cấu hình shadcn/ui
├── index.html                              # Khung HTML của ứng dụng
├── package.json                            # Thư viện phụ thuộc và lệnh chạy
├── package-lock.json                       # Lockfile npm
├── tsconfig.json                           # Cấu hình TypeScript
└── vite.config.ts                          # Cấu hình Vite và alias @/
```

### Ghi chú kiến trúc

- Đường dẫn được khai báo tập trung trong `src/shared/config/route-paths.ts`; các route module tải trang theo nhu cầu.
- `src/services/` quản lý request và kiểu dữ liệu API. Page sử dụng RTK Query hooks đã export thay vì tạo HTTP client riêng.
- API client dùng chung được đăng ký một lần trong Redux store. Cache tag giúp đồng bộ **Tài liệu của tôi** và **Thùng rác** sau các thao tác tạo, lưu, xóa hoặc khôi phục.
- Form tạo DOCX/PPTX dùng React Hook Form và Zod. File được kiểm tra ở trình duyệt trước khi API xác thực lại.
- State của tính năng như nội dung tìm kiếm, mẫu đang xem trước và dialog đang mở được quản lý tại page hoặc hook sở hữu state đó.
- Tailwind CSS 4 cung cấp utility style; khung dùng chung và design token nằm trong `src/styles/`.
