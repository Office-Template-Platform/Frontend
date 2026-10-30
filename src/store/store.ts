import { configureStore } from '@reduxjs/toolkit';
import { apiClient } from '@/shared/api/api-client';

export const store = configureStore({
    reducer: {
        [apiClient.reducerPath]: apiClient.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiClient.middleware),
});

// Suy ra kiểu state và dispatch từ cấu hình store để đồng bộ với thunk và reducer.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
