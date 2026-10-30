// Nêu bật tài liệu mới cập nhật và gom các tài liệu còn lại thành danh sách dễ quét.
import {
    CircleAlert,
    Clock3,
    Download,
    LoaderCircle,
    PencilLine,
} from 'lucide-react';
import { generatePath, Link } from 'react-router-dom';
import wordIcon from '@/assets/icons/microsoft-365/word.svg';
import { Button } from '@/components/ui/button';
import { getApiResourceUrl } from '@/shared/api/api-client';
import { ROUTE_PATHS } from '@/shared/config/route-paths';
import type {
    UserDocumentRowProps,
    UserDocumentStatusBadgeProps,
    UserDocumentsCollectionProps,
} from '@/pages/document-template-library/user-documents/types/user-documents-page.types';

const updatedAtFormatter = new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
});

// Hiển thị giờ theo locale Việt Nam và cung cấp nhãn an toàn nếu response có ngày sai định dạng.
function formatUpdatedAt(value: string): string {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return 'Thời gian chưa xác định';
    }

    return updatedAtFormatter.format(date);
}

// Chỉ giữ badge cho trạng thái cần chú ý; file sẵn sàng được nhận biết qua thao tác khả dụng.
function UserDocumentStatusBadge({ status }: UserDocumentStatusBadgeProps) {
    // Bỏ badge hoàn tất để danh sách bớt lặp nhãn xanh trên mọi tài liệu đã sẵn sàng.
    if (status === 'ready') {
        return null;
    }

    const badgeClassName =
        status === 'failed'
            ? 'border-amber-200 bg-amber-50 text-amber-800'
            : 'border-sky-200 bg-sky-50 text-sky-700';
    const StatusIcon = status === 'failed' ? CircleAlert : LoaderCircle;

    return (
        <span
            className={`inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full border px-2.5 text-[11px] font-medium ${badgeClassName}`}
        >
            <StatusIcon
                className={`size-3.5 ${status === 'provisioning' ? 'animate-spin motion-reduce:animate-none' : ''}`}
                aria-hidden="true"
            />
            {status === 'failed' ? 'Cần xử lý' : 'Đang chuẩn bị'}
        </span>
    );
}

// Hiển thị một tài liệu cùng nguồn mẫu, lần cập nhật và hành động khả dụng theo trạng thái.
function UserDocumentRow({ document, featured = false }: UserDocumentRowProps) {
    const downloadUrl = document.downloadUrl
        ? getApiResourceUrl(document.downloadUrl)
        : null;
    const editorUrl = generatePath(ROUTE_PATHS.documentEditor, {
        documentId: document.id,
    });

    return (
        <article
            className={
                featured
                    ? 'relative grid grid-cols-1 overflow-hidden rounded-[26px] border border-blue-100/85 bg-[linear-gradient(118deg,rgba(255,255,255,0.96),rgba(237,246,255,0.9)_58%,rgba(228,239,255,0.82))] p-4 shadow-[0_18px_44px_rgb(52_101_157/9%),inset_0_1px_0_rgb(255_255_255/98%)] sm:p-5 lg:grid-cols-[minmax(0,1fr)_290px] lg:items-center lg:gap-7 lg:p-6'
                    : 'flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5'
            }
        >
            {featured && (
                <div
                    className="pointer-events-none absolute -top-16 -right-12 size-48 rounded-full bg-blue-200/30 blur-3xl"
                    aria-hidden="true"
                />
            )}
            <div className="relative flex min-w-0 items-start gap-3.5 sm:items-center sm:gap-4">
                <span
                    className={
                        featured
                            ? 'grid size-12 shrink-0 place-items-center rounded-[16px] border border-white/95 bg-white text-blue-700 shadow-[0_8px_24px_rgb(33_118_229/12%)] sm:size-14 sm:rounded-[18px]'
                            : 'grid size-10 shrink-0 place-items-center rounded-[14px] border border-white/90 bg-blue-50/80 text-blue-700 shadow-[inset_0_1px_0_rgb(255_255_255/95%)]'
                    }
                    aria-hidden="true"
                >
                    <img
                        src={wordIcon}
                        alt=""
                        width={featured ? 32 : 28}
                        height={featured ? 32 : 28}
                        loading={featured ? 'eager' : 'lazy'}
                        className={
                            featured
                                ? 'size-8 object-contain'
                                : 'size-7 object-contain'
                        }
                    />
                </span>

                <div className="min-w-0 flex-1">
                    {featured ? (
                        <div className="flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-1">
                            <h2 className="line-clamp-2 min-w-0 max-w-full break-words text-pretty text-lg font-semibold tracking-[-0.035em] text-(--ink) sm:text-xl">
                                {document.title}
                            </h2>
                            <span className="inline-flex h-6 shrink-0 items-center rounded-full border border-blue-100 bg-white/75 px-2.5 text-[10px] font-semibold text-blue-700 shadow-[inset_0_1px_0_rgb(255_255_255/95%)]">
                                Vừa cập nhật
                            </span>
                            {document.status !== 'ready' && (
                                <UserDocumentStatusBadge
                                    status={document.status}
                                />
                            )}
                        </div>
                    ) : (
                        <h3 className="line-clamp-2 text-sm font-semibold tracking-[-0.02em] text-(--ink) sm:text-[15px]">
                            {document.title}
                        </h3>
                    )}
                    <p className="mt-1.5 truncate text-xs leading-5 text-(--muted-ink)">
                        Từ mẫu {document.sourceTemplate.name}, phiên bản{' '}
                        {document.sourceTemplate.version}
                    </p>
                    <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-500">
                        <Clock3
                            className="size-3.5 shrink-0"
                            aria-hidden="true"
                        />
                        Cập nhật {formatUpdatedAt(document.updatedAt)}
                    </p>
                </div>
            </div>

            <div
                className={
                    featured
                        ? 'relative mt-4 flex flex-col gap-2 border-t border-blue-100/80 pt-3.5 sm:mt-0 sm:flex-row sm:items-center sm:justify-between sm:border-0 sm:pt-0 lg:flex-col lg:items-stretch lg:justify-center lg:border-l lg:border-blue-100/85 lg:pl-7'
                        : 'flex flex-col gap-2 pl-[54px] sm:flex-row sm:items-center sm:justify-end sm:pl-0'
                }
            >
                {featured && document.status === 'ready' && (
                    <span className="hidden text-[10px] font-semibold tracking-[0.12em] text-slate-500 lg:block">
                        THAO TÁC NHANH
                    </span>
                )}
                {!featured && document.status !== 'ready' && (
                    <UserDocumentStatusBadge status={document.status} />
                )}
                {document.status === 'ready' ? (
                    <div
                        className={`flex gap-2 ${featured ? 'lg:flex-col' : ''}`}
                    >
                        <Button
                            asChild
                            size="sm"
                            className={
                                featured
                                    ? 'h-10 flex-1 rounded-[13px] bg-blue-600 px-4 text-white shadow-[0_8px_20px_rgb(33_118_229/19%)] hover:bg-blue-700 sm:flex-none lg:w-full'
                                    : 'h-9 flex-1 rounded-[12px] bg-blue-600 px-3 text-white hover:bg-blue-700 sm:flex-none'
                            }
                        >
                            <Link
                                to={editorUrl}
                                aria-label={`Mở ${document.title} để chỉnh sửa`}
                            >
                                <PencilLine aria-hidden="true" />
                                {featured ? 'Tiếp tục chỉnh sửa' : 'Mở'}
                            </Link>
                        </Button>
                        {downloadUrl && (
                            <Button
                                asChild
                                size="sm"
                                variant="outline"
                                className={
                                    featured
                                        ? 'h-10 flex-1 rounded-[13px] border-blue-100 bg-white/85 px-4 text-blue-800 hover:bg-white sm:flex-none lg:w-full'
                                        : 'h-9 flex-1 rounded-[12px] border-blue-100 bg-white/75 px-3 text-blue-800 hover:bg-white sm:flex-none'
                                }
                            >
                                <a
                                    href={downloadUrl}
                                    download
                                    aria-label={`Tải ${document.title} xuống`}
                                >
                                    <Download aria-hidden="true" />
                                    Tải DOCX
                                </a>
                            </Button>
                        )}
                    </div>
                ) : (
                    <p
                        className={`text-xs leading-5 ${document.status === 'failed' ? 'text-amber-800' : 'text-(--muted-ink)'}`}
                        role={
                            document.status === 'failed' ? 'status' : undefined
                        }
                    >
                        {document.status === 'failed'
                            ? 'File DOCX chưa được tạo thành công.'
                            : 'Các thao tác sẽ khả dụng khi DOCX sẵn sàng.'}
                    </p>
                )}
            </div>
        </article>
    );
}

// Tách bản cập nhật mới nhất khỏi các file khác để thao tác gần đây nổi bật mà không lặp card.
export function UserDocumentsCollection({
    recentDocument,
    documents,
}: UserDocumentsCollectionProps) {
    return (
        <div className="space-y-5">
            {recentDocument && (
                <UserDocumentRow document={recentDocument} featured />
            )}

            {documents.length > 0 && (
                <section
                    className="overflow-hidden rounded-[24px] border border-white/85 bg-white/38 px-4 shadow-[inset_0_1px_0_rgb(255_255_255/92%)] sm:px-5"
                    aria-labelledby="user-documents-list-heading"
                >
                    <div className="flex min-h-14 items-center justify-between gap-3 border-b border-blue-100/65">
                        <h2
                            id="user-documents-list-heading"
                            className="text-sm font-semibold tracking-[-0.02em] text-(--ink)"
                        >
                            {recentDocument ? 'Các tài liệu khác' : 'Tài liệu'}
                        </h2>
                        <span className="text-xs tabular-nums text-(--muted-ink)">
                            {documents.length} mục
                        </span>
                    </div>
                    <ul className="divide-y divide-blue-100/65">
                        {documents.map((document) => (
                            <li key={document.id}>
                                <UserDocumentRow document={document} />
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
}
