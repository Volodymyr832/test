import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config([
    js.configs.recommended,
    tseslint.configs.recommended,
    {
        languageOptions: {
            globals: {
                fetch: 'readonly',
                Response: 'readonly',
                FormData: 'readonly',
                HeadersInit: 'readonly',
                console: 'readonly'
            }
        }
    }
]);
