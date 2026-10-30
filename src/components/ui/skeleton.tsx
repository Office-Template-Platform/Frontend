import * as React from 'react';
import { cn } from '@/shared/lib/utils';

// Primitive Skeleton giữ kích thước khung trong lúc API chưa trả dữ liệu.
function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="skeleton"
            className={cn('animate-pulse rounded-md bg-muted', className)}
            {...props}
        />
    );
}

export { Skeleton };
