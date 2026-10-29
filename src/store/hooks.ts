// Cung cấp hook Redux có kiểu sẵn để component không phải khai báo kiểu lặp lại.
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/store';

// Gắn kiểu dispatch và state tại một điểm để Redux Toolkit kiểm tra selector/thunk.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
