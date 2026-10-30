// Bộ primitive Dialog của shadcn kết hợp Radix để giữ focus và bàn phím đúng chuẩn.
import * as React from 'react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/shared/lib/utils';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

// Phủ nền mờ dưới modal, đồng thời để nội dung trang không nhận tương tác nền.
function DialogOverlay({
    className,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
    return (
        <DialogPrimitive.Overlay
            data-slot="dialog-overlay"
            className={cn(
                'fixed inset-0 z-50 bg-slate-950/35 backdrop-blur-[5px] transition-opacity data-[state=closed]:opacity-0 data-[state=open]:opacity-100',
                className,
            )}
            {...props}
        />
    );
}

// Đặt modal giữa viewport và giới hạn chiều cao để form dài vẫn cuộn được trên màn nhỏ.
function DialogContent({
    className,
    children,
    showCloseButton = true,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
    showCloseButton?: boolean;
}) {
    return (
        <DialogPortal>
            <DialogOverlay />
            <DialogPrimitive.Content
                data-slot="dialog-content"
                className={cn(
                    'fixed top-1/2 left-1/2 z-50 flex max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-[760px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto rounded-[28px] border border-white/90 bg-white/88 p-5 text-(--ink) shadow-[0_36px_100px_rgba(34,74,123,0.22)] backdrop-blur-2xl outline-none sm:p-6',
                    className,
                )}
                {...props}
            >
                {children}
                {showCloseButton && (
                    <DialogPrimitive.Close asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Đóng hộp thoại"
                            className="absolute top-3 right-3 rounded-full border border-transparent bg-white/75 text-slate-600 shadow-sm transition-colors hover:border-red-100 hover:bg-red-50 hover:text-red-600"
                        >
                            <X aria-hidden="true" />
                        </Button>
                    </DialogPrimitive.Close>
                )}
            </DialogPrimitive.Content>
        </DialogPortal>
    );
}

// Căn cụm tiêu đề và mô tả để các hộp thoại dùng cùng nhịp nội dung.
function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="dialog-header"
            className={cn('flex flex-col gap-1.5 pr-10', className)}
            {...props}
        />
    );
}

// Tách hành động cuối modal khỏi phần nội dung cuộn.
function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="dialog-footer"
            className={cn(
                'mt-4 flex flex-col-reverse gap-2 border-t border-white/80 pt-4 sm:flex-row sm:justify-end',
                className,
            )}
            {...props}
        />
    );
}

// Tiêu đề được Radix liên kết với hộp thoại cho công nghệ hỗ trợ.
function DialogTitle({
    className,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
    return (
        <DialogPrimitive.Title
            data-slot="dialog-title"
            className={cn(
                'text-lg font-semibold tracking-[-0.025em] text-(--ink)',
                className,
            )}
            {...props}
        />
    );
}

// Mô tả thêm ngữ cảnh của modal và giữ màu chữ phụ thống nhất.
function DialogDescription({
    className,
    ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
    return (
        <DialogPrimitive.Description
            data-slot="dialog-description"
            className={cn('text-sm leading-6 text-(--muted-ink)', className)}
            {...props}
        />
    );
}

export {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
};
