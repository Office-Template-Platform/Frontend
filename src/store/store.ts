// Store Redux toàn cục; workflow sẽ đăng ký reducer khi có state nghiệp vụ thực tế.
import { configureStore } from '@reduxjs/toolkit';

// Giữ Redux store hợp lệ trước khi workflow đầu tiên có slice nghiệp vụ riêng.
const bootstrapReducer = (state: Record<string, never> = {}) => state;

export const store = configureStore({
    reducer: bootstrapReducer,
});

// Suy ra kiểu state và dispatch từ cấu hình store để đồng bộ với thunk và reducer.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
