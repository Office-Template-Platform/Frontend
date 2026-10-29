import { Provider } from 'react-redux';
import { Toaster } from '@/components/ui/sonner';
import { store } from '@/store/store';
import type { AppProvidersProps } from '@/providers/types/app-providers.types';

// Giữ store và Toaster ở một vị trí duy nhất để mọi route đều truy cập được.
export function AppProviders({ children }: AppProvidersProps) {
    return (
        <Provider store={store}>
            {children}
            <Toaster position="top-right" richColors />
        </Provider>
    );
}
