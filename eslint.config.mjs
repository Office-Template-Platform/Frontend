// Quy tắc lint cơ bản cho TypeScript và React; không tự sửa source khi chạy lint.
import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['dist/**'],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['src/**/*.{ts,tsx}', 'vite.config.ts'],
        languageOptions: {
            globals: globals.browser,
        },
    },
);
