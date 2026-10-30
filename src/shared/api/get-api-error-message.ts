// Chuyển error của RTK Query hoặc envelope lỗi NestJS thành thông báo đọc được.
export function getApiErrorMessage(
    error: unknown,
    fallback = 'Không thể hoàn thành yêu cầu. Vui lòng thử lại.',
): string {
    if (typeof error !== 'object' || error === null) {
        return fallback;
    }

    const queryError = error as { data?: unknown; error?: unknown };
    const responseBody = queryError.data;

    if (typeof responseBody === 'object' && responseBody !== null) {
        const responseError = (responseBody as { error?: unknown }).error;

        if (typeof responseError === 'object' && responseError !== null) {
            const message = (responseError as { message?: unknown }).message;

            if (typeof message === 'string' && message.trim()) {
                return message;
            }

            if (
                Array.isArray(message) &&
                message.every((part) => typeof part === 'string')
            ) {
                return message.join(' ');
            }
        }
    }

    if (typeof queryError.error === 'string') {
        return 'Không kết nối được với máy chủ. Kiểm tra API rồi thử lại.';
    }

    return fallback;
}
