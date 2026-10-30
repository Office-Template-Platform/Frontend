// Một nơi duy nhất cấu hình API prefix và địa chỉ backend cho toàn frontend.
export const API_BASE_PATH = '/api';

const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

export const API_BASE_URL = (
    configuredApiBaseUrl || `http://localhost:3001${API_BASE_PATH}`
).replace(/\/+$/, '');
