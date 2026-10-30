// Hợp đồng envelope JSON dùng chung giữa các endpoint API thành công và thất bại.
export type ApiSuccessResponse<TData> = {
    success: true;
    data: TData;
    meta: {
        timestamp: string;
        path: string;
        method: string;
    };
};

export type ApiErrorResponse = {
    success: false;
    error: {
        statusCode: number;
        code: string;
        message: string | string[];
    };
    meta: {
        timestamp: string;
        path: string;
        method: string;
    };
};
